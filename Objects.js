let myLibrary
const dialog = document.querySelector('dialog')
const showButton = document.querySelector('#add_button_dialog');
const closeButton = document.querySelector('dialog button');
const confirmBtn = document.getElementById('confirmBtn');
const favDialog = document.querySelector('#favDialog');
const card_container  = document.getElementById('bookList');
const saveList_btn = document.getElementById('saveList_btn');



// Buch Klasse
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'Read' : 'Not Read'}`;
    }
}


function loadLibrary() {
    const savedLibrary = localStorage.getItem('myLibrary');
    if (savedLibrary) {
        // Convert plain objects back to Book instances
        myLibrary = JSON.parse(savedLibrary).map(book => new Book(book.title, book.author, book.pages, book.read));
        myLibrary.forEach(book => createBookCard(book)); // Re-render UI
    } else {
        myLibrary = []; // Start with an empty array if no data exists

        // Add default book only if no data is found
        const hobbit = new Book('Der Hobbit', 'Tolkien', 200, 0);
        addBookToLibrary(hobbit);
    }
}




// Event listener
showButton.addEventListener("click", openDialog);
closeButton.addEventListener('click', closeDialog)
confirmBtn.addEventListener('click', addBookfromForm)

document.addEventListener('DOMContentLoaded', () => {
    loadLibrary(); // Load saved library from localStorage
});




// Functions
function openDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

function addBookfromForm(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked ? 1 : -1;
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    closeDialog();
    
    // Clear the form fields
    document.getElementById('bookForm').reset();

    // Show confirmation message
    alert(`${title} has been added to your library!`);

}

function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}



function addBookToLibrary(book) {   
    myLibrary.push(book);
    createBookCard(book);   
    saveLibrary();
}


function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author: </strong>${book.author}</p>
        <p><strong>Pages: </strong>${book.pages}</p>
        <p>
            <button class="btn read_status ${book.read ? 'read' : 'not'}" data-title="${book.read}">
                ${book.read ? 'Read' : 'Not Read'}
            </button>
        </p>
        <button class="btn delete-button" data-title="${book.title}">Delete Book</button>
    `;
    card_container.appendChild(card);

    // Add event listeners for this specific card
    card.querySelector('.delete-button').addEventListener('click', () => deleteBook(book.title));
    card.querySelector('.read_status').addEventListener('click', () => toggleReadStatus(book.title));
}

function toggleReadStatus(title) {
    const book = myLibrary.find(book => book.title === title);
    if (book) {
        book.read = !book.read; // Toggle the read status
        saveLibrary(); // Save updated library
        card_container.innerHTML = ''; // Clear and re-render cards
        myLibrary.forEach(book => createBookCard(book));
    }
}



function addDeleteBtnEvenList(){
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', ()=> {
            const title = button.getAttribute('data-title');
            deleteBook(title);
            createBookCard();
        });
    });
}


function addReadBtnEvenList(){
    console.log('avti');

    const readBtn = document.querySelectorAll('.read_status');
    readBtn.forEach(button => {
        button.addEventListener('click', ()=> {            

            const status = button.getAttribute('data-title');
        });
    });
}


function deleteBook(title) {
    myLibrary = myLibrary.filter(book => book.title !== title);
    saveLibrary(); // Save changes
    card_container.innerHTML = ''; // Clear the existing cards
    myLibrary.forEach(book => createBookCard(book)); // Re-render all cards
}


document.getElementById('searchBar').addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});



