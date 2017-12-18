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
            "url": 'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Peach_Bowl_logo.svg/987px-Peach_Bowl_logo.svg.png'
        }
    ]
}

function getMbsEvents() {
    return $.get(MBS_API);
}

//pulls information from TicketMaster API and turns them into a link. 
function makeParty(party) {
    var eventsList = party._embedded.events;
    for (i=0; i<= eventsList.length; i++) {
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
        .then(makeParty)
}

// Creates an array of slide images that are also links. 
function makeImages() {
    var imgPath = imgArray.images
    var slideArray = [];
    for (i=0; i<imgPath.length; i++) {
        var $drawLink = $('<a>', {
            class: 'slideLinks',
            href: '#',
            // data: 'slide-image'
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

function addSlide(slide) {
    $('[data-slide]').append(slide);
}

function eraseCurrentSlide() {
    $('.slideLinks').remove();
}

function slideShow() {
    var slide = makeImages()
    var currentSlide = 0;
    addSlide(slide[currentSlide])
    $('[data-prev]').on('click', function(){
        currentSlide--
        if (currentSlide < 0) {
            currentSlide = 2;
        }
        console.log('went down');
        eraseCurrentSlide()
        addSlide(slide[currentSlide]);
    })
    $('[data-next]').on('click', function(){
        currentSlide++
        if (currentSlide > 2) {
            currentSlide = 0;
        }
        console.log('went up');
        eraseCurrentSlide();
        addSlide(slide[currentSlide]);
    })
}


drawAllEvents();
slideShow();




