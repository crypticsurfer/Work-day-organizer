  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
$(document).ready(function () {
  var SavedNotif = $("#notif");
  SavedNotif.hide();
  showCurrentTime();
  
});
  $(function(){
    setInterval(updateTime, 1000) //updating time every second
  });
//creating the event to save the content in the text area
  function saveEvent(event) {
    let hourDiv = event.currentTarget.parentElement;
    console.log(hourDiv);
    appointment = hourDiv.querySelector("textarea").value.toString();
    localStorage.setItem(hourDiv.id.toString(), appointment);
    SavedNotif.show();
    console.log(localStorage.getItem(hourDiv.id.toString()));
  }
  var SaveBtn = $(".saveBtn").toArray();
  SaveBtn.forEach(button => {
    button.addEventListener("click", saveEvent)
  });
//grabbing the content from local storage 
  function populateFromStorage(){
    hourDivs.forEach(div => {
      if(localStorage.getItem(div.id.toString()) !== null){
        div.querySelector("textarea").value = localStorage.getItem(div.id.toString());
      }
    });
  }
//saving the current time and having it update in military time
  function showCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    const currentTime = dayjs().format('HH:mm:ss'); // Formats time as needed
    currentTimeElement.textContent = `Current Time: ${currentTime}`;
  }
//updating the current time and having the color change based on past present and future
  function updateTime() {
    showCurrentTime();
    let currentHour = dayjs().format('H');
    console.log(currentHour);
    var hourDivs = $(".time-block").toArray();
    hourDivs.forEach(div => {
      let divHour = Number(div.id.slice(5,div.id.length));
      console.log(divHour);

      if(divHour < currentHour){
        div.classList.add('past');
        div.classList.remove('present', 'future');
      } else if(divHour == currentHour) {
        div.classList.add('present');
        div.classList.remove('past', 'future');
      } else {
        div.classList.add('future');
        div.classList.remove('present', 'past');
      }
    });
  }


