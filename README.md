# MercedesBenzParking

<video width="600" height="400">
  <source src="/images/demo1.mov" type="video/mov">
</video>

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

<h2>Process</h2>
<ol>
  <li><a href="#concept">Concept</a></li>
  <li><a href="#planning">Planning</a></li>
  <li><a href="#challenges">Challenges</a></li>
  <li><a href="#future">Future</a></li>
 </ol>
 
<h3 class="concept">Concept</h3>
Our idea began with centralizing one location for all needs for any ticketed event going on at Mercedes Benz Stadium. We wanted to make it easier to get your event tickets and parking in one location so there would be no surprises when you arrive of the day of the event. 

<h3 class="planning">Initial Planning</h3>
Our early ideas of the app were to have the TicketMaster API allow us to buy tickets on our website and also once you selected a ticketed event, a ParkWhiz window would simultaneously bring up a window that would allow for you to purchasing parking around the Mercedes Benz Stadium for the day of the event.


<h3 class="challenges">Challenges</h3>
<h4>TicketMaster API</h4>
  <p>
    We struggled with finding the correct data needed from TicketMasters incredibly large API and getting the correct JSON information parsed.
    After retrieving the correct data, it took some time to understand the formatting of their JSON data of all the events. 
  </p>
  <p>
    Afterwards, we rendered the information into a table using JavaScript that will later be used to update the information       needed for the Google Maps.
  </p>
  <p>
    Unfortunately we were unable to purchase tickets directly from our app due to not being a TicketMaster partner. 
  </p>
<h4>Google Maps</h4>
  <p>
  We had an issue with getting the map to render onto the same html file as the TicketMaster API as this was our first time working on a collaboration project. We also had issues with the map not re-rendering with new parking information initially because the selected dates would not declare the variables properly. We solved this issue with a function that would take information from the event list table and re-declare the necessary variables to re-render the map properly with updated parking information.
  <img src="/images/code.png">
  </p>
<h4>Functionality of Table Links</h4>
  <p>
  There is still some issues of click ability on the links. The date section of the table is the only part that is clickable and will change the map. Unfortunately we could not get the information from the date column when clicking on the event list name column. 
  </p>
<h3 class="future">Future Additions</h3>
  <p>
   If we had more time, we would add the ability to purchase parking on our app. We would also work on the styling of the page to be a little more visually appealing. 
  </p>
