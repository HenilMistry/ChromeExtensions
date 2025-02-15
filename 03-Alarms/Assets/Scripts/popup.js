function showCats() {
    let newImageURL = "https://your-image-url.com/image.jpg"; // Change this to your desired image
    let url = `https://api.thecatapi.com/v1/images/search`;
    let api_key = `live_XRI09CGiRiJkEw7xtP6yQ0BwYQxquzANxlgalUYjWyvHPUY5yi9PPUNId7y7zijA`;
    fetch(url,{headers: {
        'x-api-key': api_key
      }})
    .then((response) => {
        console.log("got the response");
        return response.json();
    })
    .then((data) => {
        let imagesData = data;
        imagesData.map(function(imageData) {
        
            newImageURL = `${imageData.url}`;
        
        });
        console.log("New URL : "+newImageURL);
        document.querySelectorAll("img").forEach(img => {
            img.src = newImageURL;
            img.srcset = newImageURL; // Ensures high-resolution images are replaced too
        });
    })
    .catch(function(error) {
     console.log(error);
    });
}

document.getElementById("btn").addEventListener("click",async () => {
    changeResult(await fetchRandomCatFact());
});

document.getElementById("catImg").addEventListener("click",async () => {
    // Injects the script into pages
    console.log("Injected Script...");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showCats
    });
});

// function to fetch the random cat fact...
async function fetchRandomCatFact () {
    try {
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Failed to fetch quote:", error);
        return "Error! Fetching data.";
    }
}

// function to change the result text...
function changeResult(newResult) {
    document.getElementById("result").innerText = newResult.fact;
}