// import{
//   doLogout,
// } from "./main";

// document.addEventListener("DOMContentLoaded", function() {
//   const btn_logout = document.getElementById("btn_logout");

//   btn_logout.addEventListener("click", function() {
//     alert("Logout successfully");
//   });
// });





const notes = JSON.parse(localStorage.getItem("notes-app") || "[]");
const search = document.querySelector(".search-input");
const form = document.getElementById("form");
const saveBtn = document.getElementById("save-btn");
const titleField = document.querySelector(".title-field");
const noteField = document.querySelector(".note-field");

let isGridView = false,
  isEdit = false,
  editId;

const setGridLayout = () => {
  const cards = document.querySelector(".notes");
  const button = document.getElementById("layout-btn");
  cards.classList.add("grid");
  button.classList.add("list-view-icon");
  button.classList.remove("grid-view-icon");
  isGridView = true;
};

const setListLayout = () => {
  const cards = document.querySelector(".notes");
  const button = document.getElementById("layout-btn");
  cards.classList.remove("grid");
  button.classList.add("grid-view-icon");
  button.classList.remove("list-view-icon");
  isGridView = false;
};

const toggleLayout = () => {
  !isGridView ? setGridLayout() : setListLayout();
};

const openModal = () => {
  const modal = document.querySelector(".modal");
  const main = document.querySelector("main");
  modal.classList.add("expanded");
  main.classList.add("overlay");
};

const closeModal = () => {
  const modal = document.querySelector(".modal");
  const main = document.querySelector("main");
  modal.classList.remove("expanded");
  main.classList.remove("overlay");
  if (modal.classList.contains("edit")) {
    modal.classList.remove("edit");
  }
  form.reset();
};

const headerOnScroll = () => {
  const header = document.querySelector("header");
  let scrollPrev = window.pageYOffset;
  window.onscroll = () => {
    let scrollCur = window.pageYOffset;
    scrollPrev > scrollCur
      ? (header.style.top = "0")
      : (header.style.top = "-64px");
    scrollPrev = scrollCur;
  };
};

const displayNotes = () => {
  let li = "";
  const cards = document.querySelector(".notes");
  notes.forEach((note, i) => {
    li += `
            <li class="note" data-note-id="${note.id}" onclick="editNote(${i}, '${note.title}', '${note.description}')">
                <h3>${note.title}</h3>
                <p>${note.description}</p>
            </li>
        `;
  });
  cards.innerHTML = li;
};

const deleteNote = (noteId) => {
  const confirmDelete = confirm("Are you sure you want to delete this note?");
  if (!confirmDelete) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes-app", JSON.stringify(notes));
  closeModal();
  displayNotes();
};

const editNote = (noteId, title, description) => {
  isEdit = true;
  editId = noteId;
  const modal = document.querySelector(".modal");
  const today = new Date();
  const format = { month: "short", day: "numeric", year: "numeric" };
  const date = today.toLocaleDateString("en-us", format);
  document.querySelector(".modal-footer h5").innerText = date;
  titleField.value = title;
  noteField.value = description;
  modal.classList.add("edit");
  openModal();
};

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let titleInput = titleField.value.trim();
  let noteInput = noteField.value.trim();
  if (titleInput || noteInput) {
    let note = {
      title: titleInput,
      description: noteInput,
      id: Math.floor(Math.random() * 1000000),
    };
    if (!isEdit) {
      notes.push(note);
    } else {
      isEdit = false;
      notes[editId] = note;
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
    closeModal();
    displayNotes();
  } else {
    closeModal();
  }
});

search.addEventListener("keyup", () => {
  const note = document.querySelectorAll(".note");
  const input = search.value.toUpperCase();
  for (let i = 0; i < note.length; i++) {
    let card = note[i];
    card.innerHTML.toUpperCase().indexOf(input) > -1
      ? (note[i].style.display = "")
      : (note[i].style.display = "none");
  }
});

headerOnScroll();
displayNotes();
