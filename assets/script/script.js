// get page ready 
$(document).ready(function () {
  var todayEl = $("#today");
  var apiKey = "4f1fc5dd04c27357d18d3b5e544675b0";
  var userInput = $("#user-input");
  var userInputFormEl = $("city-search-form")
  var clearHistoryBtn = $("#clear-history-btn");
  var searchHistory = $("search-history");

  // set date and time in header
  function displayDayTime() {
    var dayAndTimeEL = moment().format("MMM DD, YYYY [at] hh:mm:ss a ");
    todayEl.text(dayAndTimeEL);
  }
  setInterval(displayDayTime, 1000);
// put function in to api url and return data in usable array send data to get weather function
function getApiOWM(){
  var weatherUrl = "api.openweathermap.org/data/2.5/weather?q=" + userInput + apiKey;
console.log(weatherUrl);
  fetch(weatherUrl)
  .then(function(response){
      return response.json();
    })
    .then(function(data){
        console.log(data);
        getWeather(data);
    })

}
// prevent misloading grab user input and put into getapi function
function formSubmitHandler (event) {
    event.preventDefault();
    if (userInput) {
        getApiOWM(userInput);
        $("#user-input").val = "";
    }
}
// on click of form look for function to begin
userInputFormEl.on("click", formSubmitHandler);
});



// $(document).ready(function () {
// var apiKey = "4f1fc5dd04c27357d18d3b5e544675b0";
// var userInput = document.getElementById("location");
// var clearHistory = document.getElementById("clear-history");
// var todayEl = document.getElementById("today");

// // set date and time in header
// function displayDayTime() {
//     var dayAndTimeEL = moment().format("MMM DD, YYYY [at] hh:mm:ss a ");
//     todayEl.text(dayAndTimeEL);
//   }
//   setInterval(displayDayTime, 1000);

// });

  // set local storage to empty
  
  // set local storage to empty
//   var savedCities =s JSON.parse(localStorage.getItem("savedCities")) || {};

//   localStorage.setItem("savedCities", JSON.stringify(savedCities));
//   userInput.val(savedCities.userInput);

//   // clear planner
//   clearHistoryBtn.on("click", function () {
//     searchHistory.empty();
//   });

//   // create our document ready function to make sure nothing runs before we load the page
//   saveBtn.on("click", function () {
//     var dayPlannerNoteEl = JSON.parse(localStorage.getItem("dayPlannerNoteEl"));
//     var commentEl = $(this).siblings(".comment").val();

//     var timeEl = $(this).siblings(".comment").attr("id");
//     dayPlannerNoteEl[timeEl] = commentEl;
//     localStorage.setItem("dayPlannerNoteEl", JSON.stringify(dayPlannerNoteEl));
//   });