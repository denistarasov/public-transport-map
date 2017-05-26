const map = L.map('map');
map.setView([59.95,30.3], 11);
map.addLayer(
    new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
);

fetch('data.json')
    .then(r => r.json())
    .then(data => {
        Object.values(data.stops).forEach(s => {
            L.circleMarker([s.lat, s.long], {
                stroke: false,
                color: '#000',
                fillOpacity: 0.8,
                radius: 5,
            }).addTo(map);
        });

        Object.values(data.routes).forEach(r => {
            Object.values(r.trips).forEach(t => {
                L.polyline(t.shape, {color: 'red'})
                    .addTo(map);
            });
        });
    });
