# MercedesBenzParking

<h2>What is it?</h2>
This app takes all events occurring at the Mercedes Benz Stadium in Atlanta, GA and shows their dates and price ranges and shows the parking for that date.

<h2>Team Members</h2>
Chris Rithmyxay<br>
Sergey Ivanes<br>
Jason Boykin

<h2>What Was Used</h2>
HTML5<br>
CSS3<br>
JavaScript<br>
jQuery<br>
AJAX<br>
TicketMaster API<br>
Google Maps API<br>
ParkWhiz API<br>

<h2>Challenges</h2>
<h3>TicketMaster API</h3>
We struggled with finding the correct data needed from TicketMasters incredibly large API and getting the correct JSON information parsed.
After retrieving the correct data, it took some time to understand the formatting of their JSON data of all the events. 
<br>
Afterwards, we rendered the information into a table using JavaScript that will later be used to update the information needed for the Google Maps.
<br>
<h3>Google Maps</h3>
We had an issue with getting the map to render onto the same html file as the TicketMaster API as this was our first time working on a collaboration project. 
<br>
<h3>Functionality of Table Links</h3>
There was some difficulty in making the table data change the map. 
<br>
We had to make a function that would rewrite the map so that if a date was clicked from the events table, it would automatically change the parking map and update it with new markers for that day. 
