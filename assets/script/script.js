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
      displayHistory(userInput);
      $("user-input").html("");
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

        var icon = $("<img>");
        icon
          .attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              "@2x.png"
          )

          .attr("alt", data.weather[0].main);
        console.log(icon);

        var temp = $("<p>");
        temp.html("Temperature: " + data.main.temp + "°F");

        var wind = $("<p>");
        wind.html("Wind speed: " + data.wind.speed + " mph");

        var humidity = $("<p>");
        humidity.html("Humidity: " + data.main.humidity + "%");

        // append retrieve info to today weather container
        $(".todays-weather").append(cityName, icon, temp, wind, humidity);

        getUv(data);
        getfiveDayFore(data);///////////////// 
      });
  }
  //obtain uv and color
  function getUv(data) {
    var uvApiKey = "4f1fc5dd04c27357d18d3b5e544675b0";
    var uvUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      data.coord.lat +
      "&lon=" +
      data.coord.lon +
      "&exclude=minutely,hourly,alerts&units=imperial&appid=" +
      uvApiKey;
      console.log(uvUrl);

    fetch(uvUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (uvdata) {
        console.log("uvdata", uvdata);
        var uvIndex = $("<div>");
        uvIndex.attr("id", "uv-color");
        uvIndex.html("UVI: " + uvdata.daily[0].uvi);
        console.log(uvdata.daily[0].uvi);
        $(".todays-weather").append(uvIndex);

        // var uvHeat = uvdata.daily[0].uvi;
        if ( uvdata.daily[0].uvi <= 3) {
          $("#uv-color").css("background-color", "green");
          $("#uv-color").addClass("uv-low");
        } else if (uvdata.daily[0].uvi > 3 && uvdata.daily[0].uvi < 5) {
          $("#uv-color").css("background-color", "yellow");
          $("#uv-color").addClass("uv-moderate");
        } else if (uvdata.daily[0].uvi > 5 && uvdata.daily[0].uvi < 7) {
          $("#uv-color").css("background-color", "orange");
          $("#uv-color").addClass("uv-high");
        } else if (uvdata.daily[0].uvi > 7 && uvdata.daily[0].uvi <= 10) {
          $("#uv-color").css("background-color", "red");
          $("#uv-color").addClass("uv-veryhigh");
        } else {
          $("#uv-color").css("background-color", "red");
          $("#uv-color").addClass("uv-extremelydangerous");
        }
        console.log(uvIndex);
      });
  }

  // get next 5 day forcast
function getfiveDayFore (fivedaydata){
  var forecasturl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
   fivedaydata.coord.lat +
  "&lon=" + 
  fivedaydata.coord.lon + 
  "&exclude=minutely,hourly,alerts&units=imperial&appid=" + 
  uvApiKey;

     
    fetch(forecasturl)
      .then(function (response) {
        return response.json();
      })
      .then(function (fiveDay) {
        console.log(fiveDay);
        $(".forecast-five").html("");
        for (var i = 1; i < 6; i ++){
          var forecastCard = $("<div>");

          var foreDateDiv = $("<div>");
          foreDateDiv.html(
            "<h4>" + moment(fiveDay.daily[i].dt * 1000).format("M/D") + "<h4>"
          );

          var foreiconDiv = $("<div>");
          foreiconDiv.html(
            "<img src= 'http://openweathermap.org/img/wn/" +
              fiveDay.daily[i].weather[0].icon +
              ".png'>"
          );

          var foreTempDiv = $("<div>");
          foreTempDiv.html("Temperature: " + fiveDay.daily[i].temp.day + "°F");

          var foreHumidityDiv = $("<div>");
          foreHumidityDiv.html("Humidity: " + fiveDay.daily[i].humidity + "%");


          var foreWindDiv = $("<div>");
          foreWindDiv.html("Wind speed: " + fiveDay.daily[i].wind_speed + " mph");

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
    var citybtn = $("<button>");
    citybtn.html(userInput);
    citybtn.attr("type", "submit");
    citybtn.attr("class", "searchHisBtn");
    citybtn.attr("city-name");
    var savedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
    savedCities.push(userInput);
    localStorage.setItem("searchedCities", JSON.stringify(savedCities));

    // search.append(newlySearchedbtn);
    $(".search-history").append(citybtn);

    citybtn.on("click", function (event) {
      var reSearchCity = citybtn.text();
      if (reSearchCity) {
        getApiOWM(reSearchCity);
      }
    });
  }

  // save search to local storage and display under the word search history.
  function searchHistory() {
    var savedCities = localStorage.getItem("searchedCities");
    var city = [];
    if (!savedCities) {
      city = [];
    } else {
      city = JSON.parse(savedCities);
    }
    if (city.length > 0) {
      for (var i = 0; i < city.length; i++) {
        var citybtn = $("<button>").html("");
        citybtn.html(city[i]);
        $(".search-history").append(citybtn);
      }

      localStorage.setItem("searchedCities", JSON.stringify(city));
    }
  }

  function startUp() {
      if (localStorage.getItem("searchedCities") === null) {
        return;
      } else {
        var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
        var city = searchedCities[0];
        console.log(city);
      }
    }
  
  function clearHistory() {
    localStorage.clear();
    $(".search-history").html("");
    $("#user-input").html("");
  }
  // on click of form look for function to begin
  searchBtnEl.on("click", formSubmitHandler);

  clearHistoryBtn.on("click", clearHistory);

  searchHistory();
});
