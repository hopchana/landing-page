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
});

function generateContent(name) {
    fetch("more-info/"+name+".txt")
        .then( response => {return response.text();} )
        .then( dane => {
            document.getElementById("more-info").innerHTML = dane;
        })
}
