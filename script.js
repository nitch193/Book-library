let myLibrary = [];
const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close-form");
let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
let hadreadCheckbox = document.getElementById("read");
const form = document.querySelector(".close");
const openForm = document.querySelector(".open-form");
const cardGrid = document.querySelector(".card-grid");

function init() {
  addButton.addEventListener("click", () => {
    addBookToLibrary();
  });
  openForm.addEventListener("click", () => {
    openform();
  });
  closeButton.addEventListener("click", () => {
    openform();
    clearForm();
  });
  if (localStorage.getItem("myLibrary")) {
    myLibrary.push(...JSON.parse(localStorage.getItem("myLibrary")));
  }
  myLibrary.forEach((book) => {
    createCard(book);
  });
}

function Book(title, author, pages, hadread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hadread = hadread;
}

function formValidation(title, author, pages) {
  if (title.length && author.length && pages) return true;
  else return false;
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  hadreadCheckbox.checked = false;
}

function openform() {
  form.classList.toggle("add-form");
}

function addBookToLibrary() {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let hadread = hadreadCheckbox.checked;
  if (formValidation(title, author, pages)) {
    let newBook = new Book(title, author, pages, hadread);
    createCard(newBook);
    myLibrary.push(newBook);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    clearForm();
    openform();
  } else alert("Some fields are not filled");
}

function createCard(book) {
  let card = document.createElement("div");
  card.classList.add("card-style");
  let name = document.createElement("h3");
  name.textContent = book.title;
  let writer = document.createElement("h4");
  writer.textContent = book.author;
  let switchStatus = document.createElement("div");
  switchStatus.classList.add("switch");
  let redd = document.createElement("input");
  redd.type = "checkbox";
  redd.checked = book.hadread;
  redd.classList.add("switch-input");
  switchStatus.setAttribute("onclick", "changeReadStatus(this)");
  switchStatus.appendChild(redd);
  let switchLabel = document.createElement("label");
  switchLabel.classList.add("switch-label");
  switchLabel.textContent = "had Read?";
  switchStatus.appendChild(switchLabel);
  let numpages = document.createElement("h5");
  numpages.textContent = book.pages;
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("onclick", "deleteCard(this)");
  styleCard(card, name, writer, switchStatus, numpages, deleteButton);
  cardGrid.appendChild(card);
}

function styleCard(Card, name, writer, switchStatus, numpages, deleteButton) {
  Card.appendChild(name);
  Card.appendChild(writer);
  Card.appendChild(numpages);
  Card.appendChild(switchStatus);
  Card.appendChild(deleteButton);
}

function deleteCard(e) {
  alert("Doy you Wnat to remove the book?");
  let title = e.parentNode.firstChild.textContent;
  e.parentNode.remove();
  myLibrary = myLibrary.filter((obj) => {
    return obj.title !== title;
  });
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function changeReadStatus(e) {
  let completed = e.firstChild.checked;
  if (completed) {
    e.firstChild.checked = false;
  } else e.firstChild.checked = true;
  let title = e.parentNode.firstChild.textContent;
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === title) {
      myLibrary[i].hadread = !myLibrary[i].hadread;
    }
  }
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

init();
