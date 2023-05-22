class Category {
    constructor(name, color, style, notes) {
        this.name = name;
        this.color = color;
        this.style = style;
        this.notes = notes;
    }
}

function getCurrentCat() {
    // const catname = document.querySelector("#title").innerHTML;
    const catname = localStorage.getItem("currentCat");
    let categories = JSON.parse(localStorage.getItem("categories"));
    return [categories, categories[catname], catname];
}

function addNote(populateCat=false) {
    let text = document.querySelector("#note");
    let note = text.value;

    if (populateCat) {
        const listEl = document.querySelector(".list");
        const noteEl = document.createElement("div");
        noteEl.innerHTML = "<div>"+note+"</div><div id=\"delbutton\"><button onclick=\"deleteNote.call(this)\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        listEl.appendChild(noteEl);
    }
    // get current category
    const catname = document.querySelector("#select").value;
    let categories = JSON.parse(localStorage.getItem("categories"));
    let cat = categories[catname];
    // cat.add(note);
    cat.notes.push(note);
    // update local storage
    categories[catname] = cat;
    localStorage.setItem("categories", JSON.stringify(categories));
    // clear input
    text.value = "";
}

function addCategory() {
    const catname = document.querySelector("#newCategory").value;
    const categories = JSON.parse(localStorage.getItem("categories"));
    categories[catname] = new Category(catname, "#f8f6c4", "check", []);
    localStorage.setItem("categories", JSON.stringify(categories));
    updateOptions();
    document.querySelector("#newCategory").value = "";
}

function updateOptions() {
    const selectEl = document.querySelector("#select");
    selectEl.innerHTML = "";
    const categories = JSON.parse(localStorage.getItem("categories"));
    for (const cat of Object.keys(categories)) {
        const optionEl = document.createElement("option");
        optionEl.innerHTML = cat;
        selectEl.appendChild(optionEl);
    }
}

function updateUser() {
    const userEl = document.querySelector("#uname");
    userEl.innerHTML = localStorage.getItem("userName");
}

function getUser() {
    return localStorage.getItem("userName");
}

function updateNotepad() {
    const boardEl = document.querySelector(".board");
    // remove last 4 child elements
//    for (let i = 0; i < 4; i++) {
//         boardEl.removeChild(boardEl.lastChild);
//     }
    // add 4 most recent notepad notes
    const notepad = JSON.parse(localStorage.getItem("notepad"));
    for (const note of notepad.slice(-4)) {
        const noteEl = document.createElement("div");
        noteEl.innerHTML = `<div class="card"><a>`+note[0]+`</a><br /><div class="user">`+note[1]+`</div></div>`;
        boardEl.appendChild(noteEl);
    }
}

function addNotepad() {
    const newNote = document.querySelector("#notepadnew").value;
    const notepad = JSON.parse(localStorage.getItem("notepad"));
    notepad.push([newNote,getUser()]);
    localStorage.setItem("notepad", JSON.stringify(notepad));
}

if (localStorage.getItem("notepad") == null) {
    localStorage.setItem("notepad", JSON.stringify([['this is an inspirational quote','trenchcoat'],['i wonder what I can put here?','800cows'],['i like eggs','sirdoug'],['beep bop','roboto']]));
}
updateOptions();
updateUser();
updateNotepad();
