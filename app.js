console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

class Book {
  // paramaters are (number, string, string, boolean)
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.bookCount = 0;
    this.books = [];
  }

  markRead(checkbox, id) {
    this.books.forEach((book) => {
      if (book.id === id) {
        book.read = true;
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }

  addBook(title, author, read) {
    const id = this.books.length + 1;
    this.books.push(new Book(id, title, author, read));
    const newRow = document.createElement("tr");
    newRow.id = `book${id}`;
    const titleData = document.createElement("td");
    titleData.textContent = title;
    const authorData = document.createElement("td");
    authorData.textContent = author;
    const readData = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "read";
    checkbox.checked = read;
    checkbox.disabled = read;
    checkbox.ariaLabel = "read";
    checkbox.title = "read";
    checkbox.addEventListener("click", ({ target }) => {
      target.checked = true;
      target.disabled = true;
    });
    readData.appendChild(checkbox);
    const removeData = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.ariaLabel = "remove";
    removeButton.title = "remove";
    removeButton.classList = "remove-button";
    removeButton.addEventListener("click", () => {
      this.removeBook(id);
    });
    removeData.appendChild(removeButton);
    newRow.appendChild(titleData);
    newRow.appendChild(authorData);
    newRow.appendChild(readData);
    newRow.appendChild(removeData);
    const tbody = document.getElementById("tbody");
    tbody.appendChild(newRow);
    this.bookCount++;
  }

  removeBook(id) {
    this.books.filter((book) => book.id !== id);
    const rowToRemove = document.getElementById(`book${id}`);
    const tbody = document.getElementById("tbody");
    tbody.removeChild(rowToRemove);
  }
}

const library = new Library();

const inputForm = document.getElementById("input-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const readInput = document.getElementById("read");

const addBookButton = document.getElementById("add-book-button");
addBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  library.addBook(titleInput.value, authorInput.value, readInput.checked);
  inputForm.reset();
});

library.addBook("Name of the Wind", "Patrick Rothfuss", true);
