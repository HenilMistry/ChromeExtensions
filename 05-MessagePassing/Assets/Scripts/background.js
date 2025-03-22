chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GREETING") {
      console.log("Received message from popup:", message.text);
      sendResponse({ reply: "Hello from background script!" });
    }
  });