//_______________________________________________________________________________
//Current-Weather-Body Section (Date time conversion)

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

// ________________________________________________________________________________
//Search Section

let apiKey = "3a8167e7e492fbf0da6f21ef3617a59b";
let units = "imperial";

let weatherSearch = document.querySelector(".weather_search");
weatherSearch.addEventListener("submit", currentCity);

function currentCity(e) {
  e.preventDefault();
  let searchInput = document.querySelector(".weather-searchform");

  if (searchInput.value) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

    axios.get(url).then(function (response) {
      updateWeatherData(response.data);
    });
  } else {
    alert("A city must be entered");
  }
}

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(url).then(function (response) {
      updateWeatherData(response.data);
    });
  });
}

function updateWeatherData(data) {
  let weatherCity = document.querySelector(".weather-city");
  let weatherTemperature = document.querySelector(".weather-temperature");
  let weatherFeelsLike = document.querySelector(".weather-feelslike");
  let weatherHumidity = document.querySelector(".weather-humidity");
  let weatherWind = document.querySelector(".weather-wind");
  let weatherPressure = document.querySelector(".weather-pressure");

  weatherCity.innerHTML = data.name;
  weatherTemperature.innerHTML = Math.round(data.main.temp) + "&#176";
  weatherFeelsLike.innerHTML = Math.round(data.main.feels_like) + "&#176";
  weatherHumidity.innerHTML = data.main.humidity + "%";
  weatherWind.innerHTML = Math.round(data.wind.speed) + "m/s";
  weatherPressure.innerHTML = data.main.pressure + " hPa";
}
// ________________________________________________________________________________
// Weather Units

// let celsiusToggle = document.querySelector(".weather-unit-celsius");
// let farenheitToggle = document.querySelector(".weather-unit-farenheit");
// let weatherTemp = document.querySelector(".weather-temperature");

// celsiusToggle.addEventListener("click", unitToggleToCelsius);
// farenheitToggle.addEventListener("click", unitToggleToFarenheit);

// function unitToggleToCelsius() {
//   if (farenheitToggle.classList.contains("toggle-color")) {
//     farenheitToggle.classList.remove("toggle-color");
//     celsiusToggle.classList.add("toggle-color");
//   }
//   weatherTemp.innerHTML = `27&#176`;
// }

// function unitToggleToFarenheit() {
//   if (celsiusToggle.classList.contains("toggle-color")) {
//     celsiusToggle.classList.remove("toggle-color");
//     farenheitToggle.classList.add("toggle-color");
//   }
//   weatherTemp.innerHTML = `80&#176`;
// }
