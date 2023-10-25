$(document).ready(function () { //creates call back function to wait for html to load
  var html = "" //creates a variable called html that is used as storage for the lines of html tha tcan be dynammically altered throughout the code. 
  var currentHour = dayjs().hour() // creates a new object that represents the current time and date and returns it in a 24 hour format.
  console.log(currentHour)

  setInterval(function () {
    $("#currentDay").text(dayjs().format ('hh:mm:ss A YYYY-MM-DD'))
  }, 1000) //update the time every second
  for (let index = 9; index < 18; index++) { //creates for loop to change 24 hour clock format to 12 hour format and determine if it's am or pm
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
  
   
  }
})