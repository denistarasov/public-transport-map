const request = require('request');
const fs = require('fs');
const path = require('path');

// IMPORTANT NOTE:
// before execution, there should be old files with data
// ('rawdata' and 'routes' catalogs)
// in order to replace them with new ones

// collect all routes numbers
// also, we collect some extra unnecessary info
const collect_routes = (transport_type, filename) => {
    const url = `http://transport.orgp.spb.ru/Portal/transport/routes/list`;
    request.post({
        url,
        form: {
            sEcho: '1',
            iColumns: '11',
            sColumns: 'id,transportType,routeNumber,name,urban,poiStart,poiFinish,cost,forDisabled,scheduleLinkColumn,mapLinkColumn',
            iDisplayStart: '0',
            iDisplayLength: '1000',
            sNames: 'id,transportType,routeNumber,name,urban,poiStart,poiFinish,cost,forDisabled,scheduleLinkColumn,mapLinkColumn',
            iSortingCols: '1',
            iSortCol_0: '2',
            sSortDir_0: 'asc',
            'transport-type':  transport_type,
        },
    }, (err, res, body) => {
        // console.log(path.join(__dirname, filename));
        fs.writeFileSync(path.join(__dirname, filename), body);
        console.log(`Successfully parsed data to \"${filename}\"`);
    });
}

const collect_routes_numbers = (/*num_json, */num_arr) => {
    combined_routes = [
        fs.readFileSync(__dirname + '/rawdata/bus_routes.json'),
        fs.readFileSync(__dirname + '/rawdata/trolley_routes.json'),
        fs.readFileSync(__dirname + '/rawdata/tram_routes.json'),
        fs.readFileSync(__dirname + '/rawdata/aquabus_routes.json'),
    ];
    combined_routes.forEach(routesJson => {
        const routes = JSON.parse(routesJson);
        routes['aaData'].forEach(route => {num_arr.push(route[0])});
    });
    num_arr.sort(function (a, b) { return a - b; });
    console.log("Number of routes:", num_arr.length);
}

count = 0;
const parse_route = (num_arr, count) => {
    if (count >= num_arr.length)
        return;
    const id = num_arr[count];
    console.log(`Currently parsing route #${id}`);
    // parse stops
    var url = `http://transport.orgp.spb.ru/Portal/transport/map/poi?ROUTE=${id}&REQUEST=GetFeature&_=1488372392174`;
    request({
        url,
    }, (err, res, body) => {
        fs.writeFileSync(path.join(__dirname, `/routes/${id}.json`), body);
    });
    // parse shape
    url = `http://transport.orgp.spb.ru/Portal/transport/map/stage?ROUTE=${id}&REQUEST=GetFeature&BBOX=0,0,10000000,10000000`;
    request({
        url,
        form: {
            Referer: `http://transport.orgp.spb.ru/Portal/transport/main`
        },
    }, (err, res, body) => {
        fs.writeFileSync(path.join(__dirname, `/routes/${id}_shape.json`), body);
    });

    ++count;

    setTimeout(function() {
        parse_route(num_arr, count);
    }, wait_time);
};

collect_routes(0, 'rawdata/bus_routes.json');
collect_routes(1, 'rawdata/trolley_routes.json');
collect_routes(2, 'rawdata/tram_routes.json');
collect_routes(46, 'rawdata/aquabus_routes.json');
var num_json;
var num_arr = [];
collect_routes_numbers(num_arr);

const wait_time = 3000; // as we don't want to DDOS server
setTimeout(function() {
    parse_route(num_arr, 0);
}, wait_time);
