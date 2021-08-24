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
        var cityName = $("<h3>");
        cityName.html(data.name + " " + currDate);
        // (data.name + " ("currDate")")

        var icon = $("<img>");
        icon
          .attr(
            "src",
            "https://openweather.org/img/wn/" + data.weather[0].icon + ".png"
          )
          .attr("alt", data.weather[0].description);

        var temp = $("<p>");
        temp.html("Temperature: " + data.main.temp + "°F");

        var wind = $("<p>");
        wind.html("Wind speed: " + data.wind.speed + " mph");

        var humidity = $("<p>");
        humidity.html("Humidity: " + data.main.humidity + "%");
        // append retrieve info to today weather container
        $(".todays-weather").append(cityName, icon, temp, wind, humidity);

        getUv();
      });
  }
  //obtain uv and color
  function getUv() {
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
        $(".todays-weather").html("");

        var uvIndex = $("<p>");
        uvIndex.html((id = "uv-color" + uvdata.value));

        var uvHeat = uvdata.value;
        if (uvHeat == 0 && uvHeat <= 3) {
          $("#uv-color").css("background-color", "green").addclass("uv-low");
        } else if (uvHeat > 3 && uvHeat < 5) {
          $("#uv-color")
            .css("background-color", "yellow")
            .addclass("uv-moderate");
        } else if (uvHeat > 5 && uvHeat < 7) {
          $("#uv-color").css("background-color", "orange").addclass("uv-high");
        } else if (uvHeat > 7 && uvHeat <= 10) {
          $("#uv-color").css("background-color", "red").addclass("uv-veryhigh");
        } else {
          $("#uv-color")
            .css("background-color", "red")
            .addclass("uv-extremelydangerous");
        }
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
        for (var i = 1; i < 6; i++) {
          var forecastCard = $("<div>");

          var foreDateDiv = $("<div>");
          foreDateDiv.html(
            "<h4>" + moments(fiveDay.daily[i].dt * 1000).format("M/D")
          );

          var foreiconDiv = $("<div>");
          foreiconDiv.html(
            "<img>".attr(
              "src",
              "https://openweather.org/img/wn/" +
                fiveDay.daily[i].weather[0].icon +
                ".png"
            )
          );

          var foreTempDiv = $("<div>");
          foreTempDiv.html("Temperature: " + fiveDay.daily[i].temp.day + "°F");

          var foreHumidityDiv = $("<div>");
          foreHumidityDiv.html("Humidity: " + fiveDay.main.humidity + "%");

          var foreWindDiv = $("<div>");
          foreWindEl.html("Wind speed: " + fiveDay.wind.speed + " mph");

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
  // save search to local storage and display under the word search history.
    function saveHistory() {
      localStorage.setItem("searchedCities", JSON.stringify(city));
    };
    function startUp() {
      if(localStorage.getItem("searchedCities") === null) {
        return;
      }
      else {
        var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
        for (var i = 0; i < searchedCities.length; i++) {
          var city = searchedCities[i];
        }
      }
    }

  // on click of form look for function to begin
  searchBtnEl.on("click", formSubmitHandler);
  startUp();
});

