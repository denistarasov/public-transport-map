const request = require('request');
const fs = require('fs');
const path = require('path');
const sphericalmercator = require('sphericalmercator');

// open the whole catalog
const filenames = fs.readdirSync(__dirname + `/routes`);

// now read all route in one json array
const routeFiles = [];
const shapeFiles = [];
filenames.forEach(filename => {
    
    /*routeFiles.push({
        filename: fs.readFileSync(__dirname + `/routes/${filename}`)
    });*/
    if (!filename.match(/(.*)_shape.json/)) { // if not shapes but routes
        routeFiles.push(fs.readFileSync(__dirname + `/routes/${filename}`));
        console.log(filename);
    } else { // if filename contains a shape
        shapeFiles.push(fs.readFileSync(__dirname + `/routes/${filename}`));
    }
});

// json string containing all routes and set of stops
const result = {
    routes: {},
    stops: {},
};

var merc = new sphericalmercator({
    size: 256
});

var routeId = 0;
routeFiles.forEach(routeStr => {
    const route = JSON.parse(routeStr);
    route['features'].forEach(stop => {
        var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
        result.stops[stop.id] = {
            lat: coords[1],
            long: coords[0],
            title: stop.properties.name,
        };
    });

    ++routeId;
    result.routes[routeId] = {
        trips: {
            A: {
                stops: route['features'].map(stop => stop.id),
                shape: route['features'].map(stop => {
                    var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
                    return [coords[1], coords[0]];
                }),
            }
        },
    };
});
const resJson = JSON.stringify(result, null, '  ');
fs.writeFileSync('data.json', resJson);