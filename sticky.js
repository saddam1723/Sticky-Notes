const container = document.getElementsByClassName('container')[0];
const btn = document.getElementsByClassName('btn')[0];

function updateStorage() {
    const storedData = localStorage.getItem("stickNotes");
    return storedData ? JSON.parse(storedData) : [];
}

updateStorage().forEach(element => {
    const sad = createText(element.id, element.content);
    container.insertBefore(sad, btn);
});

function createText(id, content) {
    const textElement = document.createElement('textarea');
    textElement.classList.add('stick');
    textElement.value = content;
    textElement.placeholder = "Enter";

    textElement.addEventListener('input', () => {
        savePermanent(id, textElement.value);
    });

    return textElement;
}

function addStick() {
    const note = updateStorage();
    const noteObj = {
        id: Math.floor(Math.random() * 1000000),
        content: ""
    };
    const sad = createText(noteObj.id, noteObj.content);
    container.insertBefore(sad, btn);
    note.push(noteObj);
    saveNote(note);
}

btn.addEventListener('click', addStick);

function saveNote(note) {
    localStorage.setItem("stickNotes", JSON.stringify(note));
}

function savePermanent(id, content) {
    const note = updateStorage();
    const updateElement = note.find(note => note.id == id);
    if (updateElement) {
        updateElement.content = content;
        saveNote(note);
    }
}
