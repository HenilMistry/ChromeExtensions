document.getElementById("refresh").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "fetch-weather" });
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "weather-data") {
        document.getElementById("weather-info").innerHTML = `<p>${message.data}</p>`;
    }
});