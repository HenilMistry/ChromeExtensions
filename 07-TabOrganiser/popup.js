window.onload = function() {
    showTabs();
};

function showTabs() {
    chrome.runtime.sendMessage({ action: "getTabs" }, (response) => {
        const tabList = document.getElementById("tabList");
        response.tabs.forEach(tab => {
            const listItem = document.createElement("li");
            listItem.textContent = tab.title;
            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.onclick = () => {
                chrome.tabs.remove(tab.id);
                tabList.innerHTML = "";
                showTabs();
            }
            listItem.appendChild(closeButton);
            tabList.appendChild(listItem);
        });
    });
}