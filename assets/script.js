var apiKey = "8bb3e7fd7fa49e2829665fc61937085d";

$(function () {
  function fiveDayForecast(latitude, longitude) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast",
      cache: false,
      data: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
        units: "imperial",
      },
    }).done(function (data) {
      $("#cityName").text(data.city.name);
      $("#currentTemp").text(data.list[0].main.temp);
      $("#currentWind").text(data.list[0].wind.speed);
      $("#currentHumidity").text(data.list[0].main.humidity);
    });
  }

  // var city;
  // var priorCity = [];
  // var current = $("#cityName");

  // localStorage.setItem(city, current);
  // priorCity.push(current);

  function setPriorCity() {
    $("#pastCity").empty();
    for (var c in localStorage) {
      if (c.substring(0,5) == "city-") {
        var value = localStorage.getItem(c);
        var element = $("<button>")
        element.text(value);
        $("#pastCity").append(element);

        element.click(function () {
          latLong($(this).text());
        });

      }
    }
  }

  // $(".priorDays").children().each().text("#cityName");

  function latLong(cityName) {
    $.ajax({
      url: "https://api.openweathermap.org/geo/1.0/direct",
      cache: false,
      data: {
        q: cityName,
        limit: 5,
        appid: apiKey,
      },
    }).done(function (data) {
      fiveDayForecast(data[0].lat, data[0].lon);
    });
  }

  



  $("#button").click(function() {
    var cityName = $("#cName").val();
    latLong(cityName);
    var cName = "city-" + cityName;
    localStorage.setItem(cName, cityName);
    setPriorCity();
  });
 
  setPriorCity();
});
