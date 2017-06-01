const map = L.map('map');
map.setView([59.95,30.3], 11);
map.addLayer(
    new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
);

var myRenderer = L.canvas({
    padding: 0.5
});

const polylines = [];
const markers = [];
const stops = [];

fetch('data.json')
    .then(r => r.json())
    .then(data => {
        Object.values(data.stops).forEach(s => {
            stops.push(s);
            markers.push(L.circleMarker([s.lat, s.long], {
                stroke: false,
                color: '#000',
                fillOpacity: 0.8,
                radius: 5,
                renderer: myRenderer
            }).addTo(map));
        });
        // Object.values(data.stops).forEach(s => {
        //     markers.push(L.marker([s.lat, s.long], {
        //         icon: square_stop,
        //         // stroke: false,
        //         // color: '#000',
        //         // fillOpacity: 0.8,
        //         // radius: 5,
        //     }).addTo(map));
        // });
        var initialStyle = {
            color: '#2d9149',
            weight: 3,
            renderer: myRenderer
        };
        var hoverStyle = {
            color: "#112233",
            weight: 9,
            renderer: myRenderer
        }

        Object.values(data.routes).forEach(r => {
            Object.values(r.trips).forEach(t => {
                polylines.push(L.polyline(t.shape, initialStyle)
                .on("mouseover", function () {
                    this.setStyle(hoverStyle);
                    this.bringToFront();
                })
                .on("mouseout", function () {
                    this.setStyle(initialStyle);
                })
                .addTo(map));
            });
        });
    });

// this function is called from html
// when 'change color' button pressed
function changeColor() {
    var color = '#' + document.getElementById("color-choice").value;
    polylines.forEach(p => {
        p.setStyle({
            color: color
        });
    });
}

function changeStop() {
    markers.forEach(m => {
        map.removeLayer(m);
    });
    if (document.getElementById("option1").checked) {
        stops.forEach(s => {
            markers.push(L.circleMarker([s.lat, s.long], {
                stroke: false,
                color: '#000',
                fillOpacity: 0.8,
                radius: 5,
                renderer: myRenderer
            }).addTo(map).bringToBack());
        });
    }
    else if (document.getElementById("option2").checked) {
        var myIcon = new L.divIcon({
            className: 'round_with_void_stop',
            iconSize: 5
        });
        stops.forEach(s => {
            markers.push(L.marker([s.lat, s.long], {
                icon: myIcon,
                renderer: myRenderer
            }).addTo(map));
        });
    }
    else if (document.getElementById("option3").checked) {
        var myIcon = new L.divIcon({
            className: 'square_stop',
            iconSize: 5
        });
        stops.forEach(s => {
            markers.push(L.marker([s.lat, s.long], {
                icon: myIcon,
                renderer: myRenderer
            }).addTo(map));
        });
    }
}
