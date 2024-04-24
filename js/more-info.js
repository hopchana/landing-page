// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Parse recordId from URL query parameters
    const name =  new URLSearchParams(window.location.search).get('name');

    // Generate content based on the recordId
    generateContent(name);

    // Initialize the Leaflet map
    let map = L.map('map');
    // Add a layer of map tiles from the OpenStreetMap server to the Leaflet map, allowing users to view a map based on OpenStreetMap data
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Load GPX file for the specified route
    new L.GPX('gpx/'+name + '.gpx', {
        async: true,
        display_wpt: false
    }).on('loaded', function (e) {
        map.fitBounds(e.target.getBounds());
    }).addTo(map);

    // Fetch marker code for the specified route
    fetch('gpx/'+name +'-markers.txt')
        .then(response => response.text())
        .then(markerCode => {
            // Use the retrieved marker code
            eval(markerCode); // Execute the marker code
        })
        .catch(error => {
            console.error('Error fetching marker code:', error);
        });

    // Fetch weather information for the specified location
    const location =  new URLSearchParams(window.location.search).get('name');
    if (location) {
        fetchWeather(location);
    }
});

// Function to generate content based on the route name
function generateContent(name) {
    // Fetch content for the specified route
    fetch("more-info/"+name+".txt")
        .then(response => { return response.text(); })
        .then(data => {
            // Update the more-info section with the retrieved content
            document.getElementById("more-info").innerHTML = data;
        });
}

// Weather API configuration
const apiKey = '1a39c7f482744820bfd114740241004';
const apiUrl = 'https://api.weatherapi.com/v1/';
const locationElement = document.getElementById('location');
const icon = document.getElementById('icon');
const temperatureElement = document.getElementById('temperature');

// Function to fetch weather information for a location
function fetchWeather(location) {
    const url = `${apiUrl}current.json?key=${apiKey}&q=${location}&aqi=no`;

    // Fetch weather data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update weather information in the HTML elements
            locationElement.innerHTML = "Current weather in " + data.location.name;
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            icon.src = data.current.condition.icon;
        })
        .catch(() => {
            // Handle errors in fetching weather information
            locationElement.textContent = "";
            icon.src = "//cdn.weatherapi.com/v4/images/weatherapi_logo.png";
            temperatureElement.textContent = "";
        });
}