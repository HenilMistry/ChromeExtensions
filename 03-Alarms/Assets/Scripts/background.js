// function to fetch the random cat fact...
async function fetchRandomCatFact () {
    try {
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        return data.fact;
      } catch (error) {
        console.error("❌ Failed to fetch quote:", error);
        return "Error! Fetching data."
      }
}

// Create an alarm that fires every 1 minute
chrome.alarms.create("fetchCatFact", { periodInMinutes: 1 });

// Listener for alarm events
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "fetchCatFact") {
    console.log(await fetchRandomCatFact());
  }
});