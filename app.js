let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes() {
  const list = document.getElementById("notesList");
  list.innerHTML = "";

  if (notes.length === 0) {
    list.innerHTML = "<p style='opacity:0.6;'>No notes yet 🌿</p>";
    return;
  }

  notes.forEach((note, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${note}</span>
      <div class="actions">
        <button onclick="editNote(${index})">✏️</button>
        <button onclick="deleteNote(${index})">🗑</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function addNote() {
  const input = document.getElementById("noteInput");

  if (input.value === "") return;

  notes.push(input.value);
  saveNotes();
  displayNotes();
  input.value = "";
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  displayNotes();
}

function editNote(index) {
  const newNote = prompt("Edit note:", notes[index]);

  if (newNote !== null) {
    notes[index] = newNote;
    saveNotes();
    displayNotes();
  }
}

/* Dark mode toggle */
const toggleBtn = document.getElementById("toggleMode");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});

displayNotes();