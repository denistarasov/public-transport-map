const request = require('request');
const fs = require('fs');
const path = require('path');
const sphericalmercator = require('sphericalmercator');

// open the whole catalog
const filenames = fs.readdirSync(__dirname + `/routes`);
filenames.sort(); // for easier finding not matching ${id} and ${id}_shape

// now read all route in one json array
const routeFiles = [];
const shapeFiles = [];
// check = 0;
filenames.forEach(filename => {
    /*routeFiles.push({
        filename: fs.readFileSync(__dirname + `/routes/${filename}`)
    });*/
    if (!filename.match(/(.*)_shape.json/)) { // if not shapes but routes
        routeFiles.push(fs.readFileSync(__dirname + `/routes/${filename}`));
        // checking missing routes
        // console.log("route:", filename);
        // ++check;
        // if (check < 0 || check > 1) {
        //     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        //     check = 1;
        // }
    } else { // if filename contains a shape
        shapeFiles.push(fs.readFileSync(__dirname + `/routes/${filename}`));
        // checking missing shapes
        // console.log("shape:", filename);
        // --check;
        // if (check < 0 || check > 1) {
        //     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        //     check = 0;
        // }
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

for (var i = 0; i < routeFiles.length; ++i) {
    const route = JSON.parse(routeFiles[i]);
    route['features'].forEach(stop => {
        var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
        result.stops[stop.id] = {
            lat: coords[1],
            long: coords[0],
            title: stop.properties.name,
        };
    });

    const shapes = JSON.parse(shapeFiles[i]);
    // parse shapes to one shape consisting of all points forming the shape
    var shape = [];
    shapes['features'].forEach(item => {
        item['geometry']['coordinates'].forEach(elem => {
            shape.push(elem);
        });
    });
    // console.log(shape);
    result.routes[i] = {
        trips: {
            A: {
                stops: route['features'].map(stop => stop.id),
                shape: shape.map(shapePoint => {
                    // sh
                    // shapePoints = shape['geometry']['coordinates'];
                    // var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
                    //     return [coords[1], coords[0]];
                    var coords = merc.inverse([shapePoint[0],shapePoint[1]]);
                    // console.log([coords[1], coords[0]]);
                    return [coords[1], coords[0]];
                }),
            }
        },
    };
}

// var routeId = 0;
// routeFiles.forEach(routeStr => {
//     const route = JSON.parse(routeStr);
//     route['features'].forEach(stop => {
//         var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
//         result.stops[stop.id] = {
//             lat: coords[1],
//             long: coords[0],
//             title: stop.properties.name,
//         };
//     });

//     ++routeId;
//     result.routes[routeId] = {
//         trips: {
//             A: {
//                 stops: route['features'].map(stop => stop.id),
//                 shape: route['features'].map(stop => {
//                     var coords = merc.inverse([stop.geometry.coordinates[0],stop.geometry.coordinates[1]]);
//                     return [coords[1], coords[0]];
//                 }),
//             }
//         },
//     };
// });
const resJson = JSON.stringify(result, null, '  ');
fs.writeFileSync('data.json', resJson);