var year = 2018;
var month = 01;
var day = 27;
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
            var priceQuote = "Sold" + "\n" + "Out";
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
        center: {lat: 33.7550543, lng: -84.3977729}, 
        zoom: 15
    });

    // var locations = [];
    
    // for (var [key, value] of dict) {
    //     var obj = {};
    //     obj['lat'] = value.latitude;
    //     obj['lng'] = value.longitude;
    //     locations.push(obj);
    // };

    // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // var markers = locations.map(function(location, i) {
    //     return new MarkerWithLabel({
    //         position: location,
    //         label: labels[i % labels.length]
    //     });
    // });
    // var value = dict.get(4);

    function addMarkerListener(marker, infoWindow, map) {
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
    var markers = [];
    function generateMarkers() {
        for (var [key, value] of dict) {
            var marker = new MarkerWithLabel({            
            
                position: new google.maps.LatLng(value.latitude, value.longitude),
                map: map,
                draggable: false, 
                raiseOnDrag: false,
                labelContent: "$" + value.priceQuote,
                labelAnchor: new google.maps.Point(15, 65),
                labelClass: "labels",
                labelInBackground: false,
                icon: pinSymbol('blue')
            })


            if (value.spotsAvailable == false) {
                marker.labelContent = value.priceQuote
                marker.icon = pinSymbol('red')
            }

            var contentString = value.streetAddress;
            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            })
            
            addMarkerListener(marker, infoWindow, map);
            markers.push(marker);
        };
        
    }
    generateMarkers();

    // console.log(markers);



    function pinSymbol(color) {
        return {
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 1,
            scale: 2,
            fontSize: "8px"
        };
    }

    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}
function mapParkingResults() {
    findParking()
        .then(initMap);
}
mapParkingResults();
// $(document).ready(google.maps.event.addDomListener(window, 'load', initMap));

function changeMap(){
    $('.eventList').on('click', '.date', function() {
        // event.preventDefault();
        console.log($(this).html());
        var year = parseInt($(this).html().slice(0,4));
        var month = parseInt($(this).html().slice(5,7));
        var day = parseInt($(this).html().slice(8));
        console.log(day);
        var start_time_unformatted = new Date (`${year} ${month} ${day} ${hour}:${minute}:00`);
        window.start_time_unformatted = start_time_unformatted;
        window.start_time = start_time_unformatted.toISOString();
        end_time_unformatted = new Date(start_time_unformatted);
        window.end_time_unformatted = new Date(end_time_unformatted.setHours(end_time_unformatted.getHours() + 5))
        window.end_time = end_time_unformatted.toISOString();
        query = `https://api.parkwhiz.com/v4/quotes/?q=venue_id:110865&start_time=${start_time}&end_time=${end_time}`
        findParking();
        mapParkingResults();
    });
}

changeMap();