console.log("Content script running");
document.body.style.border = "5px solid red";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "highlight") {
        document.body.style.backgroundColor = "yellow";
    }
});