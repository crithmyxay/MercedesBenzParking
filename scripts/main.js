// Main JS file for functions
var imgArray = {
    'images': [
        {
            "name": 'Taylor Swift',
            "url": 'https://s1.ticketm.net/dam/a/375/606d24be-8ead-40aa-a622-22e5dfd02375_581101_TABLET_LANDSCAPE_LARGE_16_9.jpg'
        },
        {
            "name": 'Falcons vs Panthers',
            "url": 'https://i.ytimg.com/vi/Qo5JwA1eBZs/maxresdefault.jpg'
        },
        {
            "name": 'Peach Bowl',
            // "url": 'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Peach_Bowl_logo.svg/987px-Peach_Bowl_logo.svg.png'
            "url": 'http://10073-presscdn-0-14.pagely.netdna-cdn.com/wp-content/uploads/sites/5/2017/12/Hero-Image-1.jpg'
        }
    ]
}

function getMbsEvents() {
    return $.get(MBS_API);
}

function sortDate(list) {
    var eventsList = list._embedded.events;
    var dateArray =[];
    var eventArray =[];
    for (var i=0; i< eventsList.length; i++) {
            var drawDate = eventsList[i].dates.start.localDate;
            dateArray.push(drawDate);
    }
    console.log('working');
    dateArray.sort()
    for (var j=0; j<dateArray.length; j++) {
        for (var k=0; k<eventsList.length; k++) {
            if (dateArray[j] === eventsList[k].dates.start.localDate) {
                eventArray.push(eventsList[k]);
            }
        }
    }
    return eventArray;
}

//pulls information from TicketMaster API and turns them into a link. 
function makeParty(party) {
    var eventsList = party._embedded.events;
    for (var i=0; i< eventsList.length; i++) {
        var eventArray = [];
        var drawDate = eventsList[i].dates.start.localDate;
        var drawName = eventsList[i].name;
        if (eventsList[i].priceRanges) {
            var prices = '$' + eventsList[i].priceRanges[0].min + ' - $' + eventsList[i].priceRanges[0].max;
        }
        else {
            var prices = 'No Prices Available'
        }
        var $drawEvent = $('<a>', {
            text: drawDate + ' ' + drawName + ' ' + prices,
            href: '#'
        })
        eventArray.push($drawEvent);
        $('[data-event-list]').append(eventArray);
    }
    return party
}

function drawAllEvents() {
    getMbsEvents()
        .then(sortDate)
        // .then(makeParty)
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
        console.log('went down');
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
        console.log('went up');
        eraseCurrentSlide();
        addSlide(slide[currentSlide]);
        addActiveDotClass(dots, currentSlide);
    })
}



drawAllEvents();
slideShow();




