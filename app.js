// _____________________________________________________________________________________________________________
//Search Section

let weatherSearch = document.querySelector(".weather_search");
weatherSearch.addEventListener("submit", currentCity);

function search(city) {
  let apiKey = "3a8167e7e492fbf0da6f21ef3617a59b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeatherData);
}

function currentCity(e) {
  e.preventDefault();
  let searchInput = document.querySelector(".weather-searchform");
  search(searchInput.value);
}

function updateWeatherData(response) {
  let weatherCity = document.querySelector(".weather-city");
  let weatherForecast = document.querySelector(".weather-forecast");
  let weatherTemperature = document.querySelector(".weather-temperature");
  let weatherFeelsLike = document.querySelector(".weather-feelslike");
  let weatherHumidity = document.querySelector(".weather-humidity");
  let weatherWind = document.querySelector(".weather-wind");
  let weatherPressure = document.querySelector(".weather-pressure");
  let weatherIcon = document.querySelector(".weather-icon");
  let weatherMin = document.querySelector("#min");
  let weatherMax = document.querySelector("#max");

  celsiusTemperature = Math.round(response.data.main.temp);
  minTemperature = Math.round(response.data.main.temp_min);
  maxTemperature = Math.round(response.data.main.temp_max);
  feels_Like = Math.round(response.data.main.feels_like);

  weatherCity.innerHTML = response.data.name;
  weatherForecast.innerHTML = response.data.weather[0].description;
  weatherMin.innerHTML =
    "Min: " + Math.round(response.data.main.temp_min) + "&#176";
  weatherMax.innerHTML =
    "Max: " + Math.round(response.data.main.temp_max) + "&#176";
  weatherTemperature.innerHTML = celsiusTemperature + "&#176";
  weatherFeelsLike.innerHTML =
    Math.round(response.data.main.feels_like) + "&#176";
  weatherHumidity.innerHTML = response.data.main.humidity + "%";
  weatherWind.innerHTML = Math.round(response.data.wind.speed) + "m/s";
  weatherPressure.innerHTML = response.data.main.pressure + " hPa";
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getWeeklyForecast(response.data.coord);
}

//______________________________________________________________________________________________________________
//Button Section

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let apiKey = "3a8167e7e492fbf0da6f21ef3617a59b";
    let units = "metric";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(url).then(updateWeatherData);
  });
}
// ____________________________________________________________________________________________________________
// Button Section - Weather Units

let celsiusTemperature = null;
let minTemperature = null;
let maxTemperature = null;
let feels_Like = null;
let fahrenheitToggle = document.querySelector(".weather-unit-fahrenheit");
let celsiusToggle = document.querySelector(".weather-unit-celsius");

fahrenheitToggle.addEventListener("click", showFahrenheitTemp);
celsiusToggle.addEventListener("click", showCelsiusTemp);

function showFahrenheitTemp(e) {
  e.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let min = (minTemperature * 9) / 5 + 32;
  let max = (maxTemperature * 9) / 5 + 32;
  let feel = (feels_Like * 9) / 5 + 32;
  let weatherTemperature = document.querySelector(".weather-temperature");
  let weatherMin = document.querySelector("#min");
  let weatherMax = document.querySelector("#max");
  let feelsLike = document.querySelector(".weather-feelslike");

  //Remove the active class link
  celsiusToggle.classList.remove("active");
  fahrenheitToggle.classList.add("active");
  weatherTemperature.innerHTML = Math.round(fahrenheitTemp) + "&#176";
  weatherMin.innerHTML = "Min: " + Math.round(min) + "&#176";
  weatherMax.innerHTML = "Max: " + Math.round(max) + "&#176";
  feelsLike.innerHTML = Math.round(feel) + "&#176";
}

function showCelsiusTemp(e) {
  e.preventDefault();
  let weatherTemperature = document.querySelector(".weather-temperature");
  let weatherMin = document.querySelector("#min");
  let weatherMax = document.querySelector("#max");
  let feelsLike = document.querySelector(".weather-feelslike");
  celsiusToggle.classList.add("active");
  fahrenheitToggle.classList.remove("active");
  weatherTemperature.innerHTML = celsiusTemperature + "&#176";
  weatherMin.innerHTML = "Min: " + minTemperature + "&#176";
  weatherMax.innerHTML = "Max: " + maxTemperature + "&#176";
  feelsLike.innerHTML = feels_Like + "&#176";
}

//_____________________________________________________________________________________________________________
//Current-Weather-Body Section &  Weather Forecast - (Date time conversions)

let today = new Date();

let dateTime = document.querySelector(".weather-datetime");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[today.getMonth()];
let date = today.getDate();
let year = today.getFullYear();

let time = today.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

dateTime.innerHTML = `${day}, ${month} ${date}, ${year} at ${time}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

//_____________________________________________________________________________________________________________
//Weekly forecast Section

function showWeeklyForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.getElementById("forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <p class="day">${formatDay(forecastDay.dt)}</p>
    <div class="icon-background">
    <img src="https://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="36">
</div>
   <div class="forecast-prediction">
    Cloudy
   </div>
   <div class="temperature-prediction">
    <span class="weather-temperature-max">${Math.round(
      forecastDay.temp.max
    )}&#176</span> | <span class="weather-temperature-min">${Math.round(
          forecastDay.temp.max
        )}&#176</span>
   </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getWeeklyForecast(coordinates) {
  let apiKey = "3a8167e7e492fbf0da6f21ef3617a59b";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeeklyForecast);
}

//call functions________________________________________________________________________________________________
search("Houston");
// showWeeklyForecast();
