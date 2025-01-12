document.getElementById("btn").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject script to read data from the web page
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: getPageData,
    },
    (result) => {
      if (result && result[0].result) {
        document.getElementById("report").innerText = result[0].result;
      } else {
        document.getElementById("report").innerText = "No data found.";
      }
    }
  );
});

// This function will run in the context of the web page
function getPageData() {
    // Example: Fetch the data from the div with id "counts"...
    const data = document.getElementById("counts").innerText;
    return data || "No paragraph text found!";
  }