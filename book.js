class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }

    info() {
        let bookInfo = `\"${this.title}\" by ${this.author}, ${this.pages} pages, `;
        if (this.read) {
            bookInfo += "already read"
        } else {
            bookInfo += "not read yet"
        }

        return bookInfo; // Expected example: "The Hobbit" by J.R.R. Tolkien, 295 pages, not read yet
    }
}