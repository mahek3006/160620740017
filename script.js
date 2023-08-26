function fetchNumbers() {
    const urlsInput = document.getElementById("urlsInput");
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
  
    const urls = urlsInput.value.split(",").map(url => url.trim());
  
    Promise.all(
      urls.map(url =>
        fetch(url)
          .then(response => response.json())
          .then(data => data.numbers)
          .catch(error => {
            console.error(`Error fetching ${url}:`, error);
            return [];
          })
      )
    )
      .then(responses => {
        const allNumbers = responses.flatMap(response => response);
        const uniqueNumbers = Array.from(new Set(allNumbers));
        uniqueNumbers.sort((a, b) => a - b);
        resultDiv.textContent = "Numbers: " + uniqueNumbers.join(", ");
      })
      .catch(error => {
        console.error("Error:", error);
        resultDiv.textContent = "An error occurred while fetching numbers.";
      });
  }
  