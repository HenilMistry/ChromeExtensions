document.getElementById("sendMessage").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "GREETING", text: "Hello from popup!" }, (response) => {
        document.getElementById("response").innerText = response.reply;
    });
});