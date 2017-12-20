window.onload = function(){
    var d = new Date();
    var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];
    var month = d.getMonth();     //0-11
    var year = d.getFullYear();  //2017
    var first_date = month_name[month] + " " + 1 + " " + year +30;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0, 3);
    var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var day_no = day_name.indexOf(first_day); //1
    var days = new Date(year, month+1, 0).getDate(); //30
    var calendar = get_calendar(day_no, days);
    document.getElementById("calendar-month-year").innerHTML = month_name[month]+ " "+year;
    document.getElementById("calendar-dates").appendChild(calendar);
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
