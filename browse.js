/*Browse books section

const books = [
    {olid: 'OL12345M', title: 'Book 1'},
    {olid: 'OL67890M', title: 'Book 2'},
    {olid: 'OL24680M', title: 'Book 3'}
];*/

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

        //Creating an overlay text
        const overlayText = document.createElement('div');
        overlayText.classList.add('overlay_text');
        overlayText.textContent = 'Vil du legge til boken i listen din?';

        //Creating title element
        const bookTitle = document.createElement('p');
        bookTitle.innerHTML = book.title;

        //Add the image and title to the div element of book
        createBookDiv.appendChild(bookImage)
        createBookDiv.appendChild(bookTitle);
        createBookDiv.appendChild(overlayText);

        //Add the bookDiv to the container
        bookContainer.appendChild(createBookDiv);

        /*Adding a click event to show book details in a modal
        createBookDiv.addEventListener('click', function() {
            showInformationAboutBook(book);
        })*/
    });
}
/*
const showInformationAboutBook = (book) => {
    const modal = document.getElementById('book_info_modal');
    document.getElementById('book_title').innerHTML = book.title;
    document.getElementById('book_author').innerHTML = 'Author: ' + book.author;
    document.getElementById('book_year').innerHTML = 'Published: ' + book.year;

    //Show the modal
    modal.style.display = 'block';

    document.getElementById('close_modal').addEventListener('click', function() {
        document.getElementById('book-info-modal').style.display = 'none';
    });
}*/

let currentPage = 1;
const booksPerPage = 20;

const fetchBooks = (page) => {
    const url = `https://openlibrary.org/subjects/fantasy.json?limit=${booksPerPage}&offset=${(page - 1) * booksPerPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const books = data.works.map(work => ({
                olid: work.cover_edition_key,
                title: work.title,
                author: work.authors ? work.authors[0].name : 'Unknown',
                year: work.first_publish_year || 'Unknown'
            }));
            displayBooks(books);
        })
        .catch(error => console.error('Error fetching books: ', error));
}

// Fetch the first page
fetchBooks(currentPage);

// Add event listeners for pagination buttons (next/previous)
document.getElementById('next_page').addEventListener('click', () => {
    currentPage++;
    fetchBooks(currentPage);
});

document.getElementById('prev_page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchBooks(currentPage);
    }
});

