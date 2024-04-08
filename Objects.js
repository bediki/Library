let myLibrary = []
const dialog = document.querySelector('dialog')
const showButton = document.querySelector('#add_button_dialog');
const closeButton = document.querySelector('dialog button');
const confirmBtn = document.getElementById('confirmBtn');
const favDialog = document.querySelector('#favDialog');
const card_container  = document.getElementById('bookList');



// Buch Klasse
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

// Initial Book in library
const hobbit = new Book('Der Hobbit', 'Tolkien', 200, 0 )
addBookToLibrary(hobbit)


// Event listener
showButton.addEventListener("click", openDialog);
closeButton.addEventListener('click', closeDialog)
confirmBtn.addEventListener('click', addBookFromForm)


// Functions

function openDialog() {
    dialog.showModal();
}


function closeDialog() {
    dialog.close();
}

function addBookFromForm(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked ? 1 : -1;
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    closeDialog();

}


function addBookToLibrary(book) {
    myLibrary.push(book);
    createBookCard(book);
}


function createBookCard(book) {

    card_container.innerHTML = '';
   
    myLibrary.forEach(bookItem => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h2>${bookItem.title}</h2>
            <p><strong>Author: </strong>${bookItem.author}</p>
            <p><strong>Pages: </strong>${bookItem.pages}</p>
            <p>
                <button class="btn read_status ${bookItem.read ? 'read' : 'not'}" data-title="${bookItem.read}" >${bookItem.read ? 'Read' : 'Not Read'}</button>
            </p>
                <button class="btn delete-button" data-title="${bookItem.title}">Delete Book</button>
        `;
        card_container.appendChild(card);
    });

    addDeleteBtnEvenList();
    addReadBtnEvenList();

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

}

function changeReadStatus(status){
    myLibrary = myLibrary.filter()
}


