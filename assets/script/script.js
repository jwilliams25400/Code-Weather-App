// get page ready
$(document).ready(function () {
  var todayEl = $("#today");
  var apiKey = "&units=imperial&appid=4f1fc5dd04c27357d18d3b5e544675b0";
  var userInput = $("#user-input").val().trim();
  var searchBtnEl = $("#search-btn");
  var currDate = moment().format("L");
  var todaysWeatherEl = $(".todays-weather")
  var clearHistoryBtn = $("#clear-history-btn");
  var searchHistory = $("search-history");

  // set date and time in header
  function displayDayTime() {
    var dayAndTimeEL = moment().format("MMM DD, YYYY [at] hh:mm:ss a ");
    todayEl.text(dayAndTimeEL);
  }
  setInterval(displayDayTime, 1000);

  // prevent misloading grab user input and put into getapi function, savehistory and fiveday 
  function formSubmitHandler(event) {
    var userInput = $("#user-input").val().trim();
    event.preventDefault();
    if (userInput) {
      getApiOWM(userInput);
      // $("#user-input").val = "";
      getfiveDayFore(userInput);
      saveHistory(userInput);
    } else {
      alert("Please enter City");
    }
  }

  // take user input and push into api url and return data in usable array send data to get weather function
  function getApiOWM(userInput) {
    var weatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + apiKey;
    console.log(weatherUrl);

    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        $(".todays-weather").html("");
        var cityName = $('<h3>');
        cityName.html(data.name + " " + currDate);
        // (data.name + " ("currDate")")

        var icon = $("<img>");
        icon.attr("src", "https://openweather.org/img/wn/" + data.weather[0].icon + ".png").attr("alt",data.weather[0].description);
        
        var temp = $("<p>");
        temp.html("Temperature: " + data.main.temp + "°F");

        var wind = $("<p>");
        wind.html("Wind speed: " + data.wind.speed + " mph");

        var humidity = $("<p>");
        humidity.html("Humidity: " + data.main.humidity + "%");
// append retrieve info to today weather container
        $(".todays-weather").append(cityName, icon, temp, wind, humidity);

      });
  }

 
    
  

    // get next 5 day forcast
var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + apiKey;


   
  // on click of form look for function to begin
  searchBtnEl.on("click", formSubmitHandler);
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
