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
    // console.log(filename);
    if (!filename.match(/(.*)_shape.json/)) { // if not shapes but routes
        routeFiles.push(fs.readFileSync(__dirname + `/routes/${filename}`));
        // and push ${id}_shape.json
        const id = filename.split('.')[0];
        shapeFiles.push(fs.readFileSync(__dirname + `/routes/${id}_shape.json`));
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

var shapeId = 0;
shapes = [];
shapeFiles.forEach(routeStr => {
    // console.log(routeStr);
    const shapeFromJson = JSON.parse(routeStr);

    ++shapeId;
    // shapes[shapeId] = 
    //     shapeFromJson['features'].map(stop => {
    //         var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
    //         return [coords[1], coords[0]];
    //     });
    // var shape = [];
    shapes[shapeId] = [];
    shapeFromJson['features'].forEach(item => {
        item['geometry']['coordinates'].forEach(elem => {
            shapes[shapeId].push(elem);
        });
    });
});


var routeId = 0;
routeFiles.forEach(routeStr => {
    // console.log(routeStr);
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
                // shape: route['features'].map(stop => {
                // var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
                // return [coords[1], coords[0]];
                // }),
                shape: shapes[routeId].map(shapePoint => {
                    // shapePoints = shape['geometry']['coordinates'];
                    // var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
                    //     return [coords[1], coords[0]];
                    var coords = merc.inverse([shapePoint[0],shapePoint[1]]);
                    // console.log([coords[1], coords[0]]);
                    return {
                        lat: coords[1],
                        lon: coords[0]
                    };
                }),
                // shape: shapes[routeId]
            }
        },
    };
});
const resJson = JSON.stringify(result, null, '  ');
fs.writeFileSync('data.json', resJson);