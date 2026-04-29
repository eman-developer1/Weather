const apiKey = 'ae1d29152cd5eb1820054d1ca609e82b';
const cityInput = document.getElementById('city-input');

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    themeBtn.innerText = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
});

// Fetch Weather Data
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert("City not found!");
    }
}

function updateUI(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°`;
    document.getElementById('weather-desc').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind').innerText = `${data.wind.speed} km/h`;
    
    // Dynamic Background logic
    updateBackground(data.weather[0].main);
}

function updateBackground(condition) {
    const body = document.body;
    if(condition === 'Rain') {
        body.className = 'bg-gradient-to-br from-gray-700 to-blue-900 min-h-screen text-white';
    } else if(condition === 'Clear') {
        body.className = 'bg-gradient-to-br from-orange-400 to-blue-500 min-h-screen text-white';
    } else {
        body.className = 'bg-gradient-to-br from-blue-400 to-blue-600 min-h-screen text-white';
    }
}

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeatherData(cityInput.value);
});