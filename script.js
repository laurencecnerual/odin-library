const myLibrary = [];
const wholepage = document.querySelector("body");
const sidebar = document.querySelector("aside");
const mainbody = document.querySelector("main");
const sideButton = document.querySelector("button.sidebar");
const form = document.querySelector("form");
let nextID = 1;
let formHidden = true;
const markRead = "Read";
const markUnread = "Unread";


function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  this.info = function() {
    let bookInfo = `\"${this.title}\" by ${this.author}, ${this.pages} pages, `;
    if (this.read) {
        bookInfo += "already read"
    } else {
        bookInfo += "not read yet"
    }

    return bookInfo; // Expected example: "The Hobbit" by J.R.R. Tolkien, 295 pages, not read yet
  };
}

function addBookToLibrary(book) {
    myLibrary.push(book); // adds the book object to the array of books

    //prepares HTML card representing a book
    let myHTMLBook = document.createElement("div");
    myHTMLBook.classList.add("book");
    myHTMLBook.setAttribute("id", nextID++);

    //prepares the text summary part of the book card
    let bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    bookInfo.textContent = book.info();
    myHTMLBook.appendChild(bookInfo);

    //prepares the delete button part of the book card
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "Delete";
    myHTMLBook.appendChild(deleteButton);
    deleteButton.addEventListener("click", (e) => {
        let parent = e.target.parentNode;
        let targetBook = getBookByID(parent.id);
        if (window.confirm("Are you sure you want to delete the following book?\n" + targetBook.info())) {
            removeBookFromLibrary(targetBook, parent);
        } 
    });

    //prepares the Read/Unread button part of the book card
    let toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle");
    toggleButton.setAttribute("type", "button");
    setReadButtonLabel(book, toggleButton);
    myHTMLBook.appendChild(toggleButton);
    toggleButton.addEventListener("click", (e) => {
        let targetButton = e.target;
        let targetBook = getBookByID(targetButton.parentNode.id);
        toggleReadStatus(targetBook, targetButton);
    });

    mainbody.appendChild(myHTMLBook); // adds the book card with all of its content to the screen
}

function displayForm() {
    form.style.display = "unset";
    formHidden = false;
}

function hideForm() {
    form.style.display = "none";
    formHidden = true;
}

function collapseExpand() {
    if (formHidden) {
        wholepage.style.gridTemplateColumns = "1fr 4fr";
        sideButton.textContent = "-";
        displayForm();
    } else {
        wholepage.style.gridTemplateColumns = "1fr 99fr";
        sideButton.textContent = "+";
        hideForm();
    }
}

sideButton.addEventListener("click", () => {
    collapseExpand();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let pages = document.querySelector("#book-pages").value;
    let read = document.querySelector("#book-read").checked;

    bookToAdd = new Book(title, author, pages, read, nextID);
    addBookToLibrary(bookToAdd);

    form.reset();
});

function removeBookFromLibrary(book, htmlBook) {
    myLibrary.pop(book);
    htmlBook.remove();
}

function toggleReadStatus(book, button) {
    book.read = !book.read;

    let updatedText = book.info();
    button.parentNode.firstChild.textContent = updatedText;

    setReadButtonLabel(book, button);
}

function setReadButtonLabel(book, button) {
    if (book.read) {
        button.textContent = markUnread;
    } else {
        button.textContent = markRead;
    }
}

function getBookByID(targetID) {
    for (let book of myLibrary) {
        if (book.id == targetID) {
            return book;
        }
    }
}

// Used to populate the library by default (for testing purposes)
for (let i = 1; i < 2; i++) {
    addBookToLibrary(new Book(`The Hobbit ${i}`, "J.R.R. Tolkien", 294 + i, i % 2 ? false : true, nextID));
}