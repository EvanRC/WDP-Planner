$(document).ready(function () { //creates call back function to wait for html to load
  var html = "" //creates a variable called html that is used as storage for the lines of html tha tcan be dynammically altered throughout the code. 
  var currentHour = dayjs().hour() // creates a new object that represents the current time and date and returns it in a 24 hour format.
  console.log(currentHour)

  setInterval(function () {
    $("#currentDay").text(dayjs().format ('hh:mm:ss A YYYY-MM-DD'))
  }, 1000) //update the time every second
  for (let index = 9; index < 18; index++) { //creates a loop to change 24 hour clock format to 12 hour format and determine if it's am or pm
    if (index < 12) {
      var timeBlock = index + "AM"
    } else if (index === 12) {
      var timeBlock = index + "PM"
    } else {
      var timeBlock = (index - 12) + "PM"// 13-12, 14-12, 15-12
    }

    var saveList = localStorage.getItem("hour-" + index) || "" //this retrieves value by the key hour- + index. Index represents the cureent hour

    if (index < currentHour) {
      var planColor = "past" //if statment sets color associated with past event if it is less than the current hour
    }
    else if (index === currentHour) {
      var planColor = "present" //if statement sets the color associated with the present event if it is equal to the current hour
    }
    else {
      var planColor = "future" //if statment sets the color associated with future event if it is greater than the current hour
    }

    html += ` 
             <div id="hour-${index}" class= "row time-block ${planColor}">
             <div class= "col-2 col-md-1 hour text-center py-3">${timeBlock}</div>
             <textarea class= "col-8 col-md-10 description" rows="3">${saveList} </textarea>
             <button class= "btn saveBtn col-2 col-md-1" aria-label="save">
                <i class="fas fa-save" aria-hidden="true"></i>
              </button>
              </div>
              `
            
  } // creates dynamic html rows numbered by hours 9am to 5pm with a text area to put a todo and a savebutton to save the info provided.

  $(".container-fluid").html(html) // replaces content in html var with new content generated by the loop

  $(".saveBtn").on('click', function (event) {
    var userDayPlan = $(this).siblings("textarea").val().trim();
    var timeBlock = $(this).parent().attr("id").trim();

    if (timeBlock && userDayPlan) {
      try {
        localStorage.setItem(timeBlock, userDayPlan);
        console.log('Button Clicked', userDayPlan, timeBlock);
      
      } catch (e) {
        console.error('Whoops! An error occured when trying to save to local storage!')
      }
    } else {
      console.error('invalid timeBlock or userDayPlan:', timeBlock, userDayPlan);
    }
    
  }); // saves user data entered into text area for todos with corresponding hour or displays error message

});