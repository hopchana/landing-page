// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Parse recordI ID from URL query parameters
    const name =  new URLSearchParams(window.location.search).get('name');

    // Generate content based on the recordId
    generateContent(name);

    // Initialize the Leaflet map
    let map = L.map('map');
    // Add a layer of map tiles from the OpenStreetMap server to the Leaflet map,
    // allowing users to view a map based on OpenStreetMap data
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Load GPX file for the specified route
    // create a new instance of the Leaflet GPX class
    new L.GPX('gpx/'+name + '.gpx', {
        async: true, // indicate that loading of the GPX file should be asynchronous
        display_wpt: false //indicate that waypoints from the GPX file should not be displayed
    // listen for the 'loaded' event, which indicates that the GPX file has been successfully loaded
    }).on('loaded', function (e) {
        // adjust the map's viewport to contain the bounding box of the GPX track
        map.fitBounds(e.target.getBounds());
    // add the GPX layer to the map
    }).addTo(map);

    // Fetch marker code for the specified route
    fetch('gpx/'+name +'-markers.txt')
        //take the response from the fetch call and extract the response body as plain text
        .then(response => response.text())
        // takes the result of the previous method and pass it as the parameter markerCode to the following function
        .then(markerCode => {
            // Use the retrieved marker code
            eval(markerCode); // Execute the marker code
        })
        // Handle errors in fetching weather markers
        .catch(error => {
            // write on console that fetching marker code failed
            console.error('Error fetching marker code:', error);
        });

    // Fetch weather information for the specified location
    fetchWeather(name);
});

// Function to generate content from txt file based on the route ID
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
// const to store API key
const apiKey = '1a39c7f482744820bfd114740241004';
// const to store basic path where request should be sent
const apiUrl = 'https://api.weatherapi.com/v1/';
// Get the container for weather information header
const locationElement = document.getElementById('location');
// Get the container for weather icon
const icon = document.getElementById('icon');
// Get the container for temperature
const temperatureElement = document.getElementById('temperature');


// Function to fetch weather information for a location
function fetchWeather(location) { // example: location = 'namibia'
    // create url for fetching
    let url = `${apiUrl}current.json?key=${apiKey}&q=${location}&aqi=no`;
    // Fetch weather data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update weather information in the HTML elements
            // set locationElement based on response
            locationElement.innerHTML = "Current weather in " + data.location.name;
            // set temperatureElement from response
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            // set icon from response
            icon.src = data.current.condition.icon;
        })
        // Handle errors in fetching weather information
        .catch(() => {
            // erase locationElement
            locationElement.textContent = "";
            // Set the icon to the weather distributor icon
            icon.src = "//cdn.weatherapi.com/v4/images/weatherapi_logo.png";
            // erase temperatureElement
            temperatureElement.textContent = "";
        });
}