const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const searchBox = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const temp = document.querySelector(".temperature");
const description = document.querySelector(".description");
const error404Text = document.querySelector(".not-found p");
const hdetails = document.querySelector(".weather-details .humidity p");
const hspans = document.querySelector(".weather-details .humidity span");
const wdetails = document.querySelector(".weather-details .wind p");
const wspans = document.querySelector(".weather-details .wind span");

// function to change app mode
function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  container.classList.toggle("dark-mode");
  searchBox.classList.toggle("dark-mode");
  temp.classList.toggle("dark-mode");
  description.classList.toggle("dark-mode");
  error404Text.classList.toggle("dark-mode");
  hdetails.classList.toggle("dark-mode");
  hspans.classList.toggle("dark-mode");
  wdetails.classList.toggle("dark-mode");
  wspans.classList.toggle("dark-mode");
}

const tempReport = document.getElementById("temp");
const humidityReport = document.getElementById("humid");
const windReport = document.getElementById("wind");
const secondTemp = document.getElementById("top-temp");

function displayReport(a, b, c){
  // temperature
  if(a > 28){
      tempReport.innerHTML = `1.Sun glare or sun strike can make it hard to see on the road, but a clean windscreen, sunglasses, and a sun visor can help.<br>
      2.Dehydration and heat exhaustion can impair your driving and cause accidents, so you should drink water, avoid alcohol and caffeine, cool down, and rest in the shade`;
  } else{
      tempReport.innerHTML = `1.Dense fog can reduce your visibility and make it hard to judge distances and speeds, so you should use low beam headlights, fog lights, or hazard lights, and follow the road markings or the vehicle in front of you, and leave enough space between you and other vehicles.`;
  }
  // humidity
  if(b > 50){
    humidityReport.innerHTML = `1.Keep windows closed: While it may be tempting to open the windows for fresh air, it's best to keep them closed to prevent humid air from entering the vehicle.<br>
    2.Use a dehumidifier: If your vehicle has a dehumidifier function, make sure to use it. This will help reduce the moisture inside the car and prevent fogging on the windows, which can obstruct your visibility.<br>
    3.Be cautious of slippery roads`;
  } else{
    humidityReport.innerHTML = `1. Stay hydrated: Low humidity can cause dehydration, so it's important to drink plenty of water before and during your drive.<br>
    2. Be cautious of static electricity: Low humidity can increase the buildup of static electricity, so be mindful when exiting or entering your vehicle to avoid getting shocked. You can touch a metal surface before touching the car to discharge any static.
    `;
  }
  // wind speed
  if(c > 2){
    windReport.innerHTML = `1. Maintain a firm grip on the steering wheel: High winds can make it difficult to control your vehicle.<br>
    2. Reduce your speed: High winds can affect the stability of your vehicle, so it's advisable to reduce your speed.<br>
    4. Keep a safe distance: Maintain a safe distance from other vehicles, especially larger ones<br>`;
  } else{
    windReport.innerHTML = `1. Maintain a safe distance: Keep a safe distance from the vehicle in front of you, as low wind speeds can still affect your vehicle's stability.<br>
    2. Be aware of crosswinds: Even though the wind may be low, it can still create crosswinds, especially in open areas.
    `;
  }
}

const getWeather = () => {
  const APIKey = "dd0f9ba29621667ac278fbb153fcadcf";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "assets/clear.png";
          break;

        case "Rain":
          image.src = "assets/rain.png";
          break;

        case "Snow":
          image.src = "assets/snow.png";
          break;

        case "Clouds":
          image.src = "assets/cloud.png";
          break;

        case "Haze":
          image.src = "assets/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "100vh";

      

      secondTemp.innerHTML = `${parseInt(json.main.temp)}°C`
      // Diaplaying report

      displayReport(`${parseInt(json.main.temp)}`, `${json.main.humidity}`, `${parseInt(json.wind.speed)}`);
    });
};
searchBox.value = "TARKWA";
getWeather();
search.addEventListener("click", getWeather);
