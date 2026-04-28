async function runSearch() {
  const query = document.getElementById("searchBox").value;
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "Loading...";

  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

    const res = await fetch(url);
    const data = await res.json();

    let output = "";

    // Instant answer
    if (data.AbstractText) {
      output += `<p><b>Answer:</b> ${data.AbstractText}</p>`;
    }

    // Related topics
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      output += "<ul>";
      data.RelatedTopics.slice(0, 5).forEach(item => {
        if (item.Text) {
          output += `<li>${item.Text}</li>`;
        }
      });
      output += "</ul>";
    }

    resultsDiv.innerHTML = output || "No results found.";

  } catch (err) {
    resultsDiv.innerHTML = "Error fetching results.";
    console.error(err);
  }
}
