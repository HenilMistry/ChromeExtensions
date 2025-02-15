document.getElementById("btn").addEventListener("click",async () => {
    changeResult(await fetchRandomCatFact());
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