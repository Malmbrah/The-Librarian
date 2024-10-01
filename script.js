
//Using a anonymous function which activates if button is pressed
document.querySelector('.submit_button').addEventListener('click', function() {
    const authorName = document.querySelector('#author-input').value;
    const bookName = document.querySelector('#book-input').value;

    searchForBooksOrAuthors(authorName, bookName);
});

const searchForBooksOrAuthors = (authorName, bookName) => {
    const apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(bookName)}&author=${encodeURIComponent(authorName)}`;

    fetch(apiUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Search results: ', data);
            displayResults(data); 
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}

const displayResults = (data) => {
    //Reset resuls
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.innerHTML = '';

    //If no results are found
    if (data.num_found === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    } 

    //Go through results and display them
    data.docs.forEach(item => {
        const resultItem = document.createElement('p');
        resultItem.textContent = `${item.title} by ${item.author_name ? item.author_name.join(', ') : 'Unknown author'}`;
        resultsContainer.appendChild(resultItem);
    });
}
