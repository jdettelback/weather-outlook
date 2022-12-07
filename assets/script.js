

var apiKey="8bb3e7fd7fa49e2829665fc61937085d";

$(function () {




  function fiveDayForecast(latitude, longitude) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast",
    cache: false,
    data: {
        lat: latitude,
        lon: longitude,
        appid: apiKey
    }
  }).done(function (data) {
    $("#cityName").text(data.city.name);
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
