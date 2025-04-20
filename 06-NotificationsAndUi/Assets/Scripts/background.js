// Periodically fetch weather data and update badge
function fetchWeatherData() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true')
      .then(response => response.json())
      .then(data => {
        const weather = data.current_weather.temperature + '°C, ' + data.current_weather.weathercode;
        chrome.action.setBadgeText({ text: data.current_weather.temperature.toString() });
        chrome.runtime.sendMessage({ type: "weather-data", data: weather });
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'weatherCheck') fetchWeatherData();
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "fetch-weather") fetchWeatherData();
  });