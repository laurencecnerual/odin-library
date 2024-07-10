const myLibrary = [];
const wholepage = document.querySelector("body");
const sidebar = document.querySelector("aside");
const mainbody = document.querySelector("main");
const sideButton = document.querySelector("button.sidebar");
const form = document.querySelector("form");
const addButton = document.querySelector("button.add-book");
let nextID = 0;
let formHidden = true;


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    let bookInfo = `\"${title}\" by ${author}, ${pages} pages, `;
    if (read) {
        bookInfo += "already read"
    } else {
        bookInfo += "not read yet"
    }

    return bookInfo; // Expected example: "The Hobbit" by J.R.R. Tolkien, 295 pages, not read yet
  };
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    let myBook = document.createElement("div");
    myBook.classList.add("book");
    myBook.setAttribute("id", nextID++);

    let bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    bookInfo.textContent = myLibrary[myLibrary.length - 1].info();
    myBook.appendChild(bookInfo);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "Del";
    myBook.appendChild(deleteButton);

    let toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle");
    toggleButton.setAttribute("type", "button");
    toggleButton.textContent = "Read";
    myBook.appendChild(toggleButton);

    mainbody.appendChild(myBook);
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

addButton.addEventListener("click", () => {
    addBookToLibrary(new Book("The Hobbit XYZ", "J.R.R. Tolkien", 2900, false));
});

function removeBookFromLibrary(book) {
    myLibrary.pop(book);
}

function toggleReadStatus(book) {
    book.read *= !book.read;
}

function displayLibrary() {
    for (let key in myLibrary) {
        let singleBook = document.createElement("div");
        singleBook.classList.add("book");
        singleBook.setAttribute("id", Number(key) + 1);
        singleBook.textContent = myLibrary[key].info();
        mainbody.appendChild(singleBook);
    }
}

for (let i = 1; i < 30; i++) {
    addBookToLibrary(new Book(`The Hobbit ${i}`, "J.R.R. Tolkien", 290 + i, i % 2 ? true : false));
}

// for (let key in myLibrary) {
//     if ((Number(key) + 1) % 3) {
//         removeBookFromLibrary(myLibrary[key]);
//     }
// }

// for (let key in myLibrary) {
//     if ((Number(key) + 1) % 5) {
//         toggleReadStatus(myLibrary[key]);
//     }
// }