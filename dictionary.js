const wordInput = document.getElementById('word');
const searchButton = document.getElementById('search');
const resultDiv = document.getElementById('result');

const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

searchButton.addEventListener('click', () => {
    const word = wordInput.value.trim();

    if (word === "") {
        resultDiv.innerHTML = "<p>Please enter a word</p>";
        return;
    }

    fetch(`${apiUrl}${word}`)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            const definition = data[0].meanings[0].definitions[0].definition;
            resultDiv.innerHTML = `<p><strong>${word}:</strong> ${definition}</p>`;
        } else {
            resultDiv.innerHTML = "<p>No definition found.</p>";
        }
    })
    .catch(() => {
        resultDiv.innerHTML = "<p>Error fetching definition.</p>";
    });
});