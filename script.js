document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector("#city-input");
  const getWeatherBtn = document.querySelector("#get-weather-btn");
  const getWeatherInfo = document.querySelector("#weather-info");
  const cityNameDisplay = document.querySelector("#city-name");
  const tempDisplay = document.querySelector("#temperature");
  const descriptionDisplay = document.querySelector("#description");
  const errorMessage = document.querySelector("#error-message");

  const API_KEY = "450da71e93f92df13c825992f313cd5c"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    //it may throw an error
    //server/DB is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //get the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);
    if (!response.ok) {
      throw new Error("City not found.");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //display weather
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;

    //unlock the display
    getWeatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    tempDisplay.textContent = `Temperature : ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
  }

  function showError() {
    getWeatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
