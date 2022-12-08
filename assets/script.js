var apiKey = "8bb3e7fd7fa49e2829665fc61937085d";

var today = dayjs();
$("#date").text(today.format("M/D/YYYY"));

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
      //$("#icon").text(data.list[0].weather[0].icon);
      $("#currentTemp")
        .text(data.list[0].main.temp)
        .prepend("Temp: ")
        .append(" °F");
      $("#currentWind")
        .text(data.list[0].wind.speed)
        .prepend("Wind: ")
        .append(" MPH");
      $("#currentHumidity")
        .text(data.list[0].main.humidity)
        .prepend("Humidity: ")
        .append(" %");

      varIconCode = data.list[0].weather[0].icon;

      var iconUrl =
        "http://openweathermap.org/img/w/" +
        data.list[0].weather[0].icon +
        ".png";
      $("#wIcon").attr("src", iconUrl);

      for (var i = 1; i < 6; i++) {
        $(".future-" + i).empty();

        var iconElement = $("<img>");
        var picture =
          "http://openweathermap.org/img/w/" +
          data.list[8 * i - 1].weather[0].icon +
          ".png";
        iconElement.attr("src", picture);
        $(".future-" + i).append(iconElement);
        

        var tempElement = $("<p>");
        tempElement.text("Temp: " + data.list[8 * i - 1].main.temp + " °F");
        $(".future-" + i).append(tempElement);
        $("#nextDayTemp").text("");

        var windElement = $("<p>");
        windElement.text("Wind: " + data.list[8 * i - 1].wind.speed + " MPH");
        $(".future-" + i).append(windElement);
        $("#nextDayWind").text("");

        var humidityElement = $("<p>");
        humidityElement.text(
          "Humidity: " + data.list[8 * i - 1].main.humidity + " %"
        );
        $(".future-" + i).append(humidityElement);
        $("#nextDayHumidity").text("");
      }

      for (var x = 1; x < 6; x++) {
        var dayElement = $("#day-" + x);
        dayElement.text(dayjs(today).add(x, "day").format("M/D/YYYY"));
      }
    });
  }

  function setPriorCity() {
    $("#pastCity").empty();
    for (var c in localStorage) {
      if (c.substring(0, 5) == "city-") {
        var value = localStorage.getItem(c);
        var element = $("<button>");
        element.text(value);
        $("#pastCity").append("<p>").append(element);

        element.click(function () {
          latLong($(this).text());
        });
      }
    }
  }

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

  $("#button").click(function () {
    var cityName = $("#cName").val();
    latLong(cityName);
    var cName = "city-" + cityName;
    localStorage.setItem(cName, cityName);
    setPriorCity();
  });

  setPriorCity();
});

//a.weather[0].icon;
//document.getElementById("icon");
