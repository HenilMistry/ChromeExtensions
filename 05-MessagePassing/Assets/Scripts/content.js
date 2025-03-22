chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("Message received in content script:", message);
    sendResponse({ reply: "Content script acknowledges!" });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject script to read data from the web page
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: () => {
        document.getElementById("main_result").innerHTML = message;
      },
    },
    (result) => {
      console.log(result);
    }
  );
  });