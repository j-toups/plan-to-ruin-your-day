var myDay = [
  { //Dileniates time allocations//
      id: "0",
      hour: "9:00",
      time: "09",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "1",
      hour: "10:00",
      time: "10",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "2",
      hour: "11:00",
      time: "11",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "3",
      hour: "12:00",
      time: "12",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "4",
      hour: "1:00",
      time: "13",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "5",
      hour: "2:00",
      time: "14",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "6",
      hour: "3:00",
      time: "15",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "7",
      hour: "4:00",
      time: "16",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "8",
      hour: "5:00",
      time: "17",
      meridiem: "pm",
      reminder: ""
  },
  
]

// Gets Header Date
function getHeaderDate() {
  var currentHeaderDate = moment().format('dddd, MMMM');
  $("#currentDay").text(currentHeaderDate);
}

// Saves data
function saveReminders() {
  localStorage.setItem("myDay", JSON.stringify(myDay));
}

// Retrieves and displays data from Local Storage
function displayReminders() {
  myDay.forEach(function (_thisHour) {
      $(`#${_thisHour.id}`).val(_thisHour.reminder);
  })
}

// Places data in view
function init() {
  var storedDay = JSON.parse(localStorage.getItem("myDay"));

  if (storedDay) {
      myDay = storedDay;
  }

  saveReminders();
  displayReminders();
}
getHeaderDate();

// Vizualizes body
myDay.forEach(function(thisHour) {
  // Creates row
  var hourRow = $("<form>").attr({
      "class": "row"
  });
  $(".container").append(hourRow);

  // Creates time in column
  var hourField = $("<div>")
      .text(`${thisHour.hour}${thisHour.meridiem}`)
      .attr({
          "class": "col-md-2 hour"
  });

  // Creates data in column
  var hourPlan = $("<div>")
      .attr({
          "class": "col-md-9 description p-0"
      });
  var planData = $("<textarea>");
  hourPlan.append(planData);
  planData.attr("id", thisHour.id);
  if (thisHour.time < moment().format("HH")) {
      planData.attr ({
          "class": "past", 
      })
  } else if (thisHour.time === moment().format("HH")) {
      planData.attr({
          "class": "present"
      })
  } else if (thisHour.time > moment().format("HH")) {
      planData.attr({
          "class": "future"
      })
  }

  // Creates button to save planner data
  var saveButton = $("<i class='far fa-save fa-lg'></i>")
  var savePlan = $("<button>")
      .attr({
          "class": "col-md-1 saveBtn"
  });
  savePlan.append(saveButton);
  hourRow.append(hourField, hourPlan, savePlan);
})

init();


// Saves to Local Storage
$(".saveBtn").on("click", function(event) {
  event.preventDefault();
  var saveIndex = $(this).siblings(".description").children(".future").attr("id");
  myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
  console.log(saveIndex);
  saveReminders();
  displayReminders();
})
