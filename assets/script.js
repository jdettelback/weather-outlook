

var apiKey="8bb3e7fd7fa49e2829665fc61937085d";

$(function () {




  function fiveDayForecast(latitude, longitude) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast",
    cache: false,
    data: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
      //  units: imperial,
    }
  }).done(function (data) {
    $("#cityName").text(data.city.name);
    $("#currentTemp").text(data.list[0].main.temp);
    //var temp = (data.list[0].main.temp);
    //var tem =((temp - 273.15) * 9) / 5 + 32;
    //t = tem.toFixed(0);
    //$("#currentTemp").text(t)
    $("#currentWind").text(data.list[0].wind.speed);
    $("#currentHumidity").text(data.list[0].main.humidity);
  });
  }

  function latLong(cityName) {
  $.ajax({
    url: "http://api.openweathermap.org/geo/1.0/direct",
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

  latLong("Cleveland");

});
