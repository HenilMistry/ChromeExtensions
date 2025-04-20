chrome.runtime.onInstalled.addListener(() => {
    console.log("Tab Organizer Extension Installed");
  });
  
  chrome.tabs.onCreated.addListener((tab) => {
    console.log("Tab Created: ", tab);
  });
  
  chrome.tabs.onRemoved.addListener((tabId) => {
    console.log("Tab Closed: ", tabId);
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTabs") {
      chrome.tabs.query({}, (tabs) => {
        sendResponse({ tabs });
      });
      return true;
    }
  });