// Main JS file for functions
// var commerceURL = `https://app.ticketmaster.com/commerce/v2/events/${eventID}/offers.json?&apikey=HfiikFk0cS2WG5paSWFhZX4mwoAW5wpO`

function getMbsEvents() {
    return $.get(MBS_API);
}

function sortAscending(a,b) {
    return a-b;
}

function makeParty(party) {
    var eventsList = party._embedded.events;
    // var eventArray = {};
    for (i=0; i<= eventsList.length; i++) {
        var eventArray = [];
        var drawDate = eventsList[i].dates.start.localDate;
        var drawName = eventsList[i].name;
        if (eventsList[i].priceRanges) {
            var prices = '$' + eventsList[i].priceRanges[0].min + ' - $' + eventsList[i].priceRanges[0].max;
        }
        else {
            prices = 'No Prices Available'
        }
        var drawEvent = $('<a>', {
            text: drawDate + ' ' + drawName + ' ' + prices,
            href: '#'
        });
        eventArray.push(drawEvent);
        $('[data-event-list]').append(eventArray);
    }
}



function drawAllEvents() {
    getMbsEvents()
        .then(makeParty)
        // .then(drawParty)
}

drawAllEvents();


