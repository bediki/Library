const myLibrary = []
const dialog = document.querySelector('dialog')
const showButton = document.querySelector('#add_button_dialog');
const closeButton = document.querySelector('dialog button');
const confirmBtn = document.getElementById('confirmBtn');
const favDialog = document.querySelector('#favDialog');
const card_container  = document.getElementById('bookList');


// Vorangelegte Bücher
const theHobbit = new Book("The Hobbit", "J.R.R", 295, 0);
const hyperion = new Book('Hyperion', 'Dan Simmons', 600, 1);
const theBible = new Book('Bible', 'no author', 500, 0);

addBookToLibrary(theHobbit);
addBookToLibrary(hyperion);
addBookToLibrary(theBible);



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


// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
}
);

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});



confirmBtn.addEventListener('click', function (e) {

    e.preventDefault(); // We don't want to submit this fake form

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked ? 'read' : 'not read yet';
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    favDialog.close();

})


function addBookToLibrary(book) {
    myLibrary.push(book);
    createBookCard(book);
}


function createBookCard(book) {

    card_container.innerHTML = '';

   

    myLibrary.forEach(book => {

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author: </strong>${book.author}</p>
        <p><strong>Pages: </strong>${book.pages}</p>
        <p>
            <strong>Status: </strong>
            <strong class="read-status ${book.read ? 'read' : 'not'}" >${book.read ? 'read' : 'not read yet'}</strong>
        </p>
        ` 

        card_container.appendChild(card);
    })


     


}



