// Main JS file for functions
var imgArray = {
    'images': [
        {
            "name": 'Taylor Swift Reputation Tour',
            "url": 'https://s1.ticketm.net/dam/a/375/606d24be-8ead-40aa-a622-22e5dfd02375_581101_TABLET_LANDSCAPE_LARGE_16_9.jpg'
        },
        {
            "name": 'Monster Jam',
            "url": 'https://i.gse.io/gse_media/116/10/1479774531-Monster-Jam-tickets.jpg?p=1'
        },
        {
            "name": 'Monster Energy AMA Supercross',
            "url": 'http://28b03yfvd7j3ji3l93ppzub1.wpengine.netdna-cdn.com/wp-content/uploads/2017/11/SuperCross_Logo-260.png'
        }
    ]
}

function getMbsEvents() {
    return $.get(MBS_API);
}

// Filters an array and removes any entries that are duplicated
function removeDuplicateEntries(array) {
    var uniqueArray = array.filter(function(elem, pos) {
        return array.indexOf(elem) == pos;
      });
    return uniqueArray;
}

//Sorts an array of dates and returns events in order by date.
function sortDate(list) {
    var eventsList = list._embedded.events;
    var dateArray =[];
    var eventArray =[];
    for (var i=0; i< eventsList.length; i++) {
            var drawDate = eventsList[i].dates.start.localDate;
            dateArray.push(drawDate);
    }
    dateArray.sort()
    for (var j=0; j<dateArray.length; j++) {
        for (var k=0; k<eventsList.length; k++) {
            if (dateArray[j] === eventsList[k].dates.start.localDate) {
                    eventArray.push(eventsList[k]);
            }
        }
    }
    var fixedArray = removeDuplicateEntries(eventArray);
    return fixedArray;
}

//pulls information from TicketMaster API and turns them into a link. 
function makeParty(party) {
    for (var i=0; i< party.length; i++) {
        var eventArray = [];
        var drawDate = party[i].dates.start.localDate;
        var drawName = party[i].name;
        if (party[i].priceRanges) {
            var prices = '$' + party[i].priceRanges[0].min + ' - $' + party[i].priceRanges[0].max;
        }
        else {
            var prices = 'No Prices Available'
        }
        var $drawEvent = $('<tr>', {
        })
        var $tableDate = $('<td>', {
            text: drawDate,
            class: 'date',
            dateId: `date${i}`
        })
        var $tableName = $('<td>', {
            class: 'name'
        })
        var $tablePrices = $('<td>', {
            text: prices,
            class: 'prices'
        })
        var $eventLink = $('<a>', {
            text: drawName,
            href: '#ticketMaster',
            class: 'link',
        })
        $drawEvent.append($tableDate);
        $drawEvent.append($tableName);
        $tableName.append($eventLink);
        $drawEvent.append($tablePrices);
        $('.eventList').append($drawEvent);
    }
    return party
}

// Function that creates events from TicketMaster API to a table
function drawAllEvents() {
    getMbsEvents()
        .then(sortDate)
        .then(makeParty)
}

// Creates an array of slide images that are also links. 
function makeImages() {
    var imgPath = imgArray.images
    var slideArray = [];
    for (i=0; i<imgPath.length; i++) {
        var $drawLink = $('<a>', {
            class: 'slideLinks fade',
            href: '#',
            'data-slide-image': ''
        })
        var $drawImg = $('<img>', {
        src: imgPath[i].url,
        alt: '#'
        }) 
        $drawLink.append($drawImg);
        slideArray.push($drawLink);
    }
    return slideArray;
}

// Creates the dots that highlight which image is being shown in slideshow
function makeDots() {
    var imgPath = imgArray.images
    var dotsArray = [];
    for (i=0; i<imgPath.length; i++) {
        var $drawDot = $('<span>', {
        class: 'dot'
        })
        dotsArray.push($drawDot);
    }
    return dotsArray;
}

function addSlide(slide) {
    $('[data-slide]').append(slide);
}

function drawDots(dots) {
    $('[data-dot]').append(dots);
}

function eraseCurrentSlide() {
    $('[data-slide-image]').remove();
}
 
function removeActiveDotClass(dots, currentSlide) {
    $(dots[currentSlide]).removeClass("active");
}

function addActiveDotClass(dots, currentSlide) {
    $(dots[currentSlide]).attr("class", "dot active");
}

//Takes images from an array and turns them into a slideshow for main viewing page. 
function slideShow() {
    var slide = makeImages();
    var dots = makeDots();
    var currentSlide = 0;
    var activeDot = $(dots[currentSlide]).attr("class", "dot active");
    addSlide(slide[currentSlide]);
    drawDots(dots);
    $('[data-prev]').on('click', function(){
        removeActiveDotClass(dots, currentSlide);
        currentSlide--
        if (currentSlide < 0) {
            currentSlide = 2;
        }
        eraseCurrentSlide()
        addSlide(slide[currentSlide]);
        addActiveDotClass(dots, currentSlide);
    })
    $('[data-next]').on('click', function(){
        removeActiveDotClass(dots, currentSlide);
        currentSlide++
        if (currentSlide > 2) {
            currentSlide = 0;
        }
        eraseCurrentSlide();
        addSlide(slide[currentSlide]);
        addActiveDotClass(dots, currentSlide);
    })
}

drawAllEvents();
slideShow();