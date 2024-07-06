const myLibrary = [];
const body = document.querySelector("body");

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
}

function displayLibrary() {
    for (let key in myLibrary) {
        let singleBook = document.createElement("div");
        singleBook.classList.add("book");
        singleBook.textContent = myLibrary[key].info();
        body.appendChild(singleBook);
    }
}

for (let i = 1; i < 30; i++) {
    addBookToLibrary(new Book(`The Hobbit ${i}`, "J.R.R. Tolkien", 290 + i, i % 2 ? true : false));
}

displayLibrary();