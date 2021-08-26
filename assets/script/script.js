// get page ready
$(document).ready(function () {
  var todayEl = $("#today");
  var apiKey = "&units=imperial&appid=4f1fc5dd04c27357d18d3b5e544675b0";
  var uvApiKey = "4f1fc5dd04c27357d18d3b5e544675b0";
  var userInput = $("#user-input").val().trim();
  var forecastFiveDiv = $(".forecast-five");
  var searchBtnEl = $("#search-btn");
  var currDate = moment().format("L");
  var todaysWeatherEl = $(".todays-weather");
  var clearHistoryBtn = $("#clear-history-btn");
  // var searchHistory = $("search-history");

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
      searchHistory(userInput);
      displayHistory(userInput);
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
        var cityName = $("<h3>");
        cityName.html(data.name + " " + currDate);
        // (data.name + " ("currDate")")

        var icon = $("<img>");
        icon
          .attr("src", "https://openweather.org/img/wn/" + data.weather[0].icon)
          .attr("alt", data.weather[0].description);

        var temp = $("<p>");
        temp.html("Temperature: " + data.main.temp + "°F");

        var wind = $("<p>");
        wind.html("Wind speed: " + data.wind.speed + " mph");

        var humidity = $("<p>");
        humidity.html("Humidity: " + data.main.humidity + "%");
        // append retrieve info to today weather container
        $(".todays-weather").append(cityName, icon, temp, wind, humidity);

        getUv(data);
      });
  }
  //obtain uv and color
  function getUv(data) {
    var uvApiKey = "4f1fc5dd04c27357d18d3b5e544675b0";
    var uvUrl =
      "https://api.openweathermap.org/data/2.5//onecall?lat=" +
      data.coord.lat +
      "&lon=" +
      data.coord.lon +
      "&exclude=minutely,hourly,alerts&units=imperial&appid=" +
      uvApiKey;

    fetch(uvUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (uvdata) {
        console.log("uvdata", uvdata);
        var uvIndex = $("<p>");
        uvIndex.attr("id", "uv-color");
        uvIndex.text("UVI: " + uvdata.current.uvi);

        var uvHeat = uvdata.current.uvi;
        if (uvHeat == 0 && uvHeat <= 3) {
          $("#uv-color").css("background-color", "green").addClass("uv-low");
        } else if (uvHeat > 3 && uvHeat < 5) {
          $("#uv-color")
            .css("background-color", "yellow")
            .addClass("uv-moderate");
        } else if (uvHeat > 5 && uvHeat < 7) {
          $("#uv-color").css("background-color", "orange").addClass("uv-high");
        } else if (uvHeat > 7 && uvHeat <= 10) {
          $("#uv-color").css("background-color", "red").addClass("uv-veryhigh");
        } else {
          $("#uv-color")
            .css("background-color", "red")
            .addClass("uv-extremelydangerous");
        }
        $(".todays-weather").append(uvIndex);
      });
  }

  // get next 5 day forcast
  function getfiveDayFore(userInput) {
    var forecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userInput +
      "&appid=" +
      uvApiKey;

    fetch(forecast)
      .then(function (response) {
        return response.json();
      })
      .then(function (fiveDay) {
        $(".forecast-five").html("");
        for (var i = 0; i < 40; i += 8) {
          var forecastCard = $("<div>");

          var foreDateDiv = $("<div>");
          foreDateDiv.html(
            "<h4>" + moment(fiveDay.list[i].dt * 1000).format("M/D") + "</h4>"
          );
          console.log(fiveDay);

          var foreiconDiv = $("<div>");
          foreiconDiv.html(
            "<img src= 'https://openweather.org/img/wn/" +
              fiveDay.list[i].weather.icon +
              ".png'>"
          );

          var foreTempDiv = $("<div>");
          foreTempDiv.html("Temperature: " + fiveDay.list[i].temp + "°F");

          var foreHumidityDiv = $("<div>");
          foreHumidityDiv.html(
            "Humidity: " + fiveDay.list[i].main.humidity + "%"
          );

          var foreWindDiv = $("<div>");
          foreWindDiv.html(
            "Wind speed: " + fiveDay.list[i].wind.speed + " mph"
          );

          forecastCard.append(
            foreDateDiv,
            foreiconDiv,
            foreTempDiv,
            foreHumidityDiv,
            foreWindDiv
          );

          $(".forecast-five").append(forecastCard);
        }
      });
  }
// create history search list

function displayHistory(userInput) {
  $(".search-history").html("");
  var newlySearchedbtn = $("button");
  newlySearchedbtn.html(userInput);
  newlySearchedbtn.attr("type", "submit")

  searchLi.append(newlySearchedbtn);
  $(".search-history").prepend(searchLi);
  
newlySearchedbtn.on("click",getApiOWM)
}


  // save search to local storage and display under the word search history.
  function searchHistory() {
    localStorage.setItem("searchedCities", JSON.stringify(userInput));
  }
  function startUp() {
    if (localStorage.getItem("searchedCities") === null) {
      return;
    } else {
      var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
      for (var i = 0; i < searchedCities.length; i++) {
        var city = searchedCities[i];
        console.log(city);

      }
    }
  }

  // on click of form look for function to begin
  searchBtnEl.on("click", formSubmitHandler);
  startUp();
});
