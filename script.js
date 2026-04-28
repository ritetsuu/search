async function runSearch() {
  const query = document.getElementById("searchBox").value;
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "Loading...";

  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

    const res = await fetch(url);

    console.log("Response status:", res.status);

    const text = await res.text();
    console.log("Raw response:", text);

    const data = JSON.parse(text);

    resultsDiv.innerHTML = data.AbstractText
      ? data.AbstractText
      : "No results found.";

  } catch (err) {
    console.error("FULL ERROR:", err);
    resultsDiv.innerHTML = "Error: " + err.message;
  }
}
