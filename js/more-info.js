document.addEventListener('DOMContentLoaded', function () {

    // Parse recordId from URL query parameters
    const name =  new URLSearchParams(window.location.search).get('name');
    generateContent(name);
    let map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    new L.GPX('gpx/'+name + '.gpx', {
        async: true,
        display_wpt:false
    }).on('loaded', function (e) {
        map.fitBounds(e.target.getBounds());
    }).addTo(map);

    fetch('gpx/'+name +'-markers.txt')
        .then(response => response.text())
        .then(markerCode => {
            // Use the retrieved marker code
            eval(markerCode); // Execute the marker code
        })
        .catch(error => {
            console.error('Error fetching marker code:', error);
        });
    const location =  new URLSearchParams(window.location.search).get('name');
    if (location) {
        fetchWeather(location);
    }
});

function generateContent(name) {
    fetch("more-info/"+name+".txt")
        .then( response => {return response.text();} )
        .then( dane => {
            document.getElementById("more-info").innerHTML = dane;
        })
}

const apiKey = '1a39c7f482744820bfd114740241004';
const apiUrl = 'https://api.weatherapi.com/v1/';

const locationElement = document.getElementById('location');
const icon = document.getElementById('icon');
const temperatureElement = document.getElementById('temperature');

function fetchWeather(location) {
    const url = `${apiUrl}current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.innerHTML = "Current weather in " + data.location.name;
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            icon.src=data.current.condition.icon;
        })
        .catch(() => {
            locationElement.textContent = "Something went wrong. Try again";
            icon.src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png";
            temperatureElement.textContent = "";
        });
}
