window.onload = function(){
    // var d = new Date();
    // var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];
    // var month = d.getMonth();     //0-11
    // var year = d.getFullYear();  //2017
    // var first_date = month_name[month] + " " + 1 + " " + year +30;
    // var tmp = new Date(first_date).toDateString();
    // var first_day = tmp.substring(0, 3);
    // var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // var day_no = day_name.indexOf(first_day); //1
    // var days = new Date(year, month+1, 0).getDate(); //30
    // var calendar = get_calendar(day_no, days);
    // document.getElementById("calendar-month-year").innerHTML = month_name[month]+ " "+year;
    // document.getElementById("calendar-dates").appendChild(calendar);
    // $('input').glDatePicker().trigger('click');
    $('input').glDatePicker(
        {
            showAlways: true,
             //cssName: 'darkneon',
            // selectedDate: new Date(2013, 0, 5),
             specialDates: [
                {
                    date: new Date(2017, 11, 31),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 0, 1),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 0, 7),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 0, 8),
                    // data: { message: 'Happy New Year!' },
                   // repeatYear: true 
                },
                {
                    date: new Date(2018, 0, 21),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 0, 27),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 1, 1),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 1, 11),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 1, 21),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 1, 24),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 1, 25),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 2, 3),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 2, 4),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 1, 13),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 4, 26),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 7, 10),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 7, 11),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
                {
                    date: new Date(2018, 10, 10),
                    // data: { message: 'Meeting every day 8 of the month' },
                    // repeatMonth: true
                },
            ],
            onClick: function(target, cell, date, data) {
              var year= date.getFullYear();
              var month = date.getMonth() +1;
              month =(month<10)? '0' + month : month; 
                var day = date.getDate();
            day =(day<10)? '0' + day : day;
                
                    var dateStr = year+ '-'+ month + '-' + day;
                    var findArg = 'tr td.date:contains(' + dateStr + ')';
                    $('#matching-events').empty();
                        
                    $('#matching-events').append(
                    $('.eventList').find(findArg).parent().clone());
                    var eventText =  $('#matching-events').find('.name a').text();
                    $('#matching-events').find('.name a').replaceWith($('<span>' + eventText + '</span>'));
                    
            }
        });
}

function get_calendar(day_no, days){
    var table = document.createElement('table');
    var tr = document.createElement('tr');

    // row for the day letters
    for(var c=0; c<6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //create 2nd row
    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        var span = document.createElement('span');
        span.innerHTML = count;
        span.classList.add("has_events");
        count++;
        td.appendChild(span);
        tr.appendChild(td);
    }
    table.appendChild(tr);

    // rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            var span = document.createElement('span');
            span.innerHTML = count;
            count++;
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);

    
    }   
    return table;
}
