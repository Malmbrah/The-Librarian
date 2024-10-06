
//Using a anonymous function which activates if button is pressed
document.querySelector('.submit_button').addEventListener('click', function() {
    const authorName = document.querySelector('#author-input').value;
    const bookName = document.querySelector('#book-input').value;

    searchForBooksOrAuthors(authorName, bookName);
});


const searchForBooksOrAuthors = (authorName, bookName) => {

    if(!bookName && !authorName){
        alert('Please enter either an author or a book title to search');
        return;
    }

    let apiUrl = 'https://openlibrary.org/search.json?';

    if(bookName) {
        apiUrl += `title=${encodeURIComponent(bookName)}`;
    }

    if(authorName) {
        apiUrl += `author=${encodeURIComponent(authorName)}`;
    }

    if(authorName && bookName) {
        apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(bookName)}&author=${encodeURIComponent(authorName)}`;
    }

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

    // Sorter søkeresultatene alfabetisk etter boktittel
    const sortedResults = data.docs.sort((a, b) => {
        const titleA = a.title.toLowerCase(); // Hent og konverter boktittelen til små bokstaver
        const titleB = b.title.toLowerCase();
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0; // Sorter bokstav for bokstav
    });

    //Go through results and display them
    sortedResults.forEach(item => {
        const resultItem = document.createElement('p');
        resultItem.textContent = `${item.title} by ${item.author_name ? item.author_name.join(', ') : 'Unknown author'}`;
        resultsContainer.appendChild(resultItem);
    });
}

//Resets the values when you click the "clear-button"
document.querySelector('.clear_button').addEventListener('click', function() {
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.innerHTML = '';
    document.querySelector('#author-input').value = '';
    document.querySelector('#book-input').value = '';
})

const modal = document.querySelector('#login-modal');
const logInButton = document.querySelector('#login');
const closeButton = document.querySelector('.close-button');
const modalContent = document.querySelector('.modal-content')

//When you click the log in button
logInButton.addEventListener('click', function(event ) {
    event.preventDefault(); //Preventing default anchor behavior
    modal.style.display = 'block';
});

//When you click the close button, remove the modal
closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
});

document.getElementById('navbar_logo').addEventListener('click', function() {
    window.location.href = 'index.html';
});

//Browse books section

const books = [
    {olid: 'OL12345M', title: 'Book 1'},
    {olid: 'OL67890M', title: 'Book 2'},
    {olid: 'OL24680M', title: 'Book 3'}
];

const displayBooks = (books) => {
    const bookContainer = document.getElementById('book_container');
    bookContainer.innerHTML = ''; //To clear any existing content

    books.forEach(book => {
        //Creating a book element
        const createBookDiv = document.createElement('div');
        createBookDiv.classList.add('book_item');

        //Creating the image for book
        const bookImage = document.createElement('img');
        bookImage.src = `https://covers.openlibrary.org/b/olid/${book.olid}-M.jpg`;
        bookImage.alt = book.title; //Describing the picture with book title if image does not load

        //Creating title element
        
    })
}