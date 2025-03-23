// const API_KEY = "621038426222a40794510967459d7187";
// // Function to fetch weather data
// async function getWeather() {
//     const city = document.getElementById("cityInput").value;
//     if (!city) return alert("Please enter a city name!");

//     try {
//         const response = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`);
//         const data = await response.json();

//         document.getElementById("weatherResult").classList.remove("hidden");
//         document.getElementById("cityName").textContent = `Weather in ${data.name}`;
//         document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
//         document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
//     } catch (error) {
//         alert("City not found!");
//     }
// }

// // Function to add favorite locations
// function addToFavorites() {
//     const city = document.getElementById("cityName").textContent.replace("Weather in ", "");
//     if (!city) return;

//     let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     if (!favorites.includes(city)) {
//         favorites.push(city);
//         localStorage.setItem("favorites", JSON.stringify(favorites));
//         displayFavorites();
//     }
// }

// // Function to display favorites
// function displayFavorites() {
//     const favoritesList = document.getElementById("favoritesList");
//     favoritesList.innerHTML = "";

//     const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     favorites.forEach(city => {
//         const li = document.createElement("li");
//         li.textContent = city;
//         favoritesList.appendChild(li);
//     });
// }

// // Load favorites on page load
// window.onload = displayFavorites;

// 

// const API_KEY = "621038426222a40794510967459d7187"; 

// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("searchBtn").addEventListener("click", getWeather);
// });

// // Fetch weather data
// async function getWeather() {
//     const city = document.getElementById("cityInput").value.trim();
//     if (!city) {
//         alert("Please enter a city name.");
//         return;
//     }

//     const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (!data.location) {
//             alert("City not found");
//             return;
//         }

//         // Display weather details
//         document.getElementById("cityName").textContent = data.location.name;
//         document.getElementById("temperature").textContent = `Temperature: ${data.current.temperature}°C`;
//         document.getElementById("description").textContent = `Weather: ${data.current.weather_descriptions[0]}`;
//         document.getElementById("weatherIcon").src = data.current.weather_icons[0];
//         document.getElementById("windSpeed").textContent = data.current.wind_speed;

//         // Convert time to local time
//         const localTime = new Date(data.location.localtime);
//         document.getElementById("currentTime").textContent = `Local Time: ${localTime.toLocaleTimeString()}`;

//         // Display section
//         document.getElementById("weatherResult").style.display = "block";

//         getForecast(city);

//     } catch (error) {
//         console.error("Error fetching weather:", error);
//     }
// }

// // Fetch 5-day forecast
// async function getForecast(city) {
//     const url = `http://api.weatherstack.com/forecast?access_key=${API_KEY}&query=${city}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (!data.forecast) return;

//         // 5-day forecast
//         const forecastDiv = document.getElementById("fiveDayForecast");
//         forecastDiv.innerHTML = "<h3>5-Day Forecast</h3>";

//         Object.keys(data.forecast).slice(0, 5).forEach(day => {
//             const forecast = data.forecast[day];
//             forecastDiv.innerHTML += `
//                 <div>
//                     <p><strong>${day}</strong></p>
//                     <p>🌡️ Max: ${forecast.maxtemp}°C | Min: ${forecast.mintemp}°C</p>
//                 </div>
//             `;
//         });

//     } catch (error) {
//         console.error("Error fetching forecast:", error);
//     }
// }

// // Add city to favorites
// function addToFavorites() {
//     const city = document.getElementById("cityName").textContent;
//     if (!city) return;

//     let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     if (!favorites.includes(city)) {
//         favorites.push(city);
//         localStorage.setItem("favorites", JSON.stringify(favorites));
//         alert(`${city} added to favorites!`);
//     }
// }

// // Show favorites
// function toggleFavorites() {
//     const favContainer = document.getElementById("favorites");
//     favContainer.style.display = favContainer.style.display === "none" ? "block" : "none";
//     showFavorites();
// }

// // Load and display favorites
// function showFavorites() {
//     let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     const list = document.getElementById("favoritesList");
//     list.innerHTML = "";
//     favorites.forEach(city => {
//         let li = document.createElement("li");
//         li.textContent = city;
//         list.appendChild(li);
//     });
// }

// // Load favorites on page load
// window.onload = showFavorites;






const API_KEY = "58dde70157298125900149b8a4307745";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", getWeather);
});

// Fetch weather data
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.location) {
            alert("City not found");
            return;
        }

        const lat = data.location.lat;
        const lon = data.location.lon;

        document.getElementById("cityName").textContent = data.location.name;
        document.getElementById("temperature").textContent = `${data.current.temperature}°C`;
        document.getElementById("feelsLike").textContent = `Feels like: ${data.current.feelslike}°C`;
        document.getElementById("description").textContent = data.current.weather_descriptions[0];
        document.getElementById("windSpeed").textContent = `${data.current.wind_speed} km/h`;
        document.getElementById("humidity").textContent = `${data.current.humidity}%`;

        const localTime = new Date(data.location.localtime);
        document.getElementById("currentTime").textContent = localTime.toLocaleTimeString();
        document.getElementById("currentDate").textContent = localTime.toDateString();

        // Fetch extra data
        await getSunriseSunset(lat, lon);
        await getFiveDayForecast(lat, lon);
        await getHourlyForecast(lat, lon);

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// Fetch Sunrise & Sunset Times
async function getSunriseSunset(lat, lon) {
    const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results) {
            console.error("Sunrise-Sunset API Error");
            return;
        }

        document.getElementById("sunrise").textContent = data.results.sunrise;
        document.getElementById("sunset").textContent = data.results.sunset;

    } catch (error) {
        console.error("Error fetching sunrise & sunset times:", error);
    }
}

// Fetch 5-Day Forecast
async function getFiveDayForecast(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.daily) {
            console.error("5-day forecast data not available");
            return;
        }

        const forecastDiv = document.getElementById("fiveDayForecast");
        forecastDiv.innerHTML = "";

        for (let i = 0; i < 5; i++) {
            const date = new Date(data.daily.time[i]).toDateString();
            const maxTemp = data.daily.temperature_2m_max[i];
            const minTemp = data.daily.temperature_2m_min[i];

            forecastDiv.innerHTML += `
                <div>
                    <p><strong>${date}</strong></p>
                    <p>🌡️ Max: ${maxTemp}°C | Min: ${minTemp}°C</p>
                </div>
            `;
        }

    } catch (error) {
        console.error("Error fetching 5-day forecast:", error);
    }
}

// Fetch Hourly Forecast
async function getHourlyForecast(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.hourly) {
            console.error("Hourly forecast data not available");
            return;
        }

        const hourlyDiv = document.getElementById("hourlyForecast");
        hourlyDiv.innerHTML = "";

        for (let i = 0; i < 5; i++) {
            const time = new Date(data.hourly.time[i]).toLocaleTimeString();
            const temp = data.hourly.temperature_2m[i];
            const windSpeed = data.hourly.wind_speed_10m[i];

            hourlyDiv.innerHTML += `
                <div>
                    <p><strong>${time}</strong></p>
                    <p>🌡️ ${temp}°C</p>
                    <p>💨 Wind: ${windSpeed} km/h</p>
                </div>
            `;
        }

    } catch (error) {
        console.error("Error fetching hourly forecast:", error);
    }
}

// Add city to favorites
function addToFavorites() {
    const city = document.getElementById("cityName").textContent;
    if (!city) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${city} added to favorites!`);
    }
}

// Toggle Favorites
function toggleFavorites() {
    const favContainer = document.getElementById("favorites");
    favContainer.style.display = favContainer.style.display === "none" ? "block" : "none";
    showFavorites();
}

// Show stored favorites
function showFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    document.getElementById("favoritesList").innerHTML = favorites.map(city => `<li>${city}</li>`).join("");
}

// Trigger search when Enter key is pressed
document.getElementById("cityInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if inside a form
        document.getElementById("searchBtn").click(); // Trigger search button click
    }
});

// Sign Out Button - Redirect to Login Page
document.getElementById("signOut").addEventListener("click", function () {
    window.location.href = "getstarted.html?form=login"; // Redirect to login page
});


window.onload = showFavorites;

