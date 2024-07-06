const myLibrary = [];

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
        console.log(myLibrary[key].info());
    }
}

addBookToLibrary(new Book("The Hobbit 1", "J.R.R. Tolkien", 291, true));
addBookToLibrary(new Book("The Hobbit 2", "J.R.R. Tolkien", 292, true));
addBookToLibrary(new Book("The Hobbit 3", "J.R.R. Tolkien", 293, false));

displayLibrary();
