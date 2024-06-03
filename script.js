document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchQuery = document.getElementById('search-query');
    const resultsContainer = document.getElementById('results');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchQuery.value;
        if (query.trim() === '') {
            alert('Please enter a search query.');
            return;
        }
        fetchResults(query);
    });

    async function fetchResults(query) {
        try {
            const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            resultsContainer.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
        }
    }

    function displayResults(data) {
        resultsContainer.innerHTML = '';
        if (data.results && data.results.length > 0) {
            data.results.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.classList.add('result');
                resultElement.innerHTML = `<h2><a href="${result.url}" target="_blank">${result.title}</a></h2><p>${result.description}</p>`;
                resultsContainer.appendChild(resultElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
});
