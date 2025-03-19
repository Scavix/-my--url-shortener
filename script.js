async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;
  const customCode = document.getElementById("customCode").value;

  const response = await fetch("/.netlify/functions/shorten", {
    method: "POST",
    body: JSON.stringify({ longUrl, customCode }),
  });

  const result = await response.json();

  if (result.error) {
    alert(result.error);
  } else {
    document.getElementById("shortUrl").textContent = result.shortUrl;
  }
}

async function fetchAnalytics() {
    const response = await fetch('/.netlify/functions/analytics');
    const data = await response.json();
  
    const table = document.getElementById('analyticsTable');
    table.innerHTML = '<tr><th>Short URL</th><th>Long URL</th><th>Clicks</th></tr>'; // Reset table
  
    data.forEach(({ short_code, long_url, click_count }) => {
      const row = table.insertRow();
      row.insertCell(0).innerHTML = `<a href="/${short_code}" target="_blank">${short_code}</a>`;
      row.insertCell(1).innerText = long_url;
      row.insertCell(2).innerText = click_count;
    });
  }
  