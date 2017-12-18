var year = 2017;
var month = 12;
var day = 31;
var hour = 12;
var minute = 00;



var start_time_unformatted = new Date (`${year} ${month} ${day} ${hour}:${minute}:00`);
var start_time = start_time_unformatted.toISOString();
var end_time_unformatted = new Date(start_time_unformatted);
end_time_unformatted = new Date(end_time_unformatted.setHours(end_time_unformatted.getHours() + 5))
var end_time = end_time_unformatted.toISOString();
var query = `https://api.parkwhiz.com/v4/quotes/?q=venue_id:110865&start_time=${start_time}&end_time=${end_time}`
var dict = new Map();

function Location(name, streetAddress, priceQuote, spotsAvailable, longitude, latitude) {
    this.name = name;
    this.streetAddress = streetAddress;
    this.priceQuote = priceQuote;
    this.spotsAvailable = spotsAvailable;
    this.longitude = longitude;
    this.latitude = latitude;
}

function openPWApi() {
    return $.get(query);
}

function crunchData(parkingNamesList) {
    for (var i=0; i<parkingNamesList.length; i++) {
        var name = parkingNamesList[i]['_embedded']['pw:location']['name'];
        var streetAddress = parkingNamesList[i]['_embedded']['pw:location']['address1']
        var spotsAvailable = parkingNamesList[i].purchase_options[0];
        var latitude = parkingNamesList[i]._embedded['pw:location'].entrances[0].coordinates[0];
        var longitude = parkingNamesList[i]._embedded['pw:location'].entrances[0].coordinates[1];
        if (spotsAvailable) {
            var priceQuote = parkingNamesList[i].purchase_options[0].price.USD;
            var spotsAvailable = true;
        } else {
            var priceQuote = false;
            var spotsAvailable = false;
        }

        var constr = new Location(name, streetAddress, priceQuote, spotsAvailable, longitude, latitude)
        dict.set(i, constr);
    }
}

function findParking() {
    return openPWApi()
        .then(crunchData);
}


var map;

function initMap () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.7554333, lng: -84.4032554}, 
        zoom: 15
    });

    var locations = [];
    
    for (var [key, value] of dict) {
        var obj = {};
        obj['lat'] = value.latitude;
        obj['lng'] = value.longitude;
        locations.push(obj);
    };
    console.log(dict.length);
    console.log(locations);

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}

function mapParkingResults() {
    findParking()
        .then(initMap);
}
mapParkingResults();

