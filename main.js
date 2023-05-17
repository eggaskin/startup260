/*
*  javascript for delete buttons
* new category buttons
* add notes to categories
* delete notes
* global datastructure
* login buttons

use array of strings for notes
use array of objects for categories
use array of objects for users

SEPARATE JS FILES FOR EACH PAGE

ADD CHECKBOX FUNCTIONALITY
*/

class Category {
    constructor(name, color, style, notes) {
        this.name = name;
        this.color = color;
        this.style = style;
        this.notes = notes;
    }

    add(note) {
        this.notes.push(note);
        // update local storage
        const categories = JSON.parse(localStorage.getItem("categories"));
        categories[this.name] = this;
        localStorage.setItem("categories", JSON.stringify(categories));
    }

    delete(note) {
        // delete note
        let i = this.notes.indexOf(note);
        if (i > -1) {
            this.notes[i] = this.notes.splice(i, 1);
        }
    }

    style(color,style) {
        this.color = color;
        this.style = style;
        // update local storage
        const categories = JSON.parse(localStorage.getItem("categories"));
        categories[this.name] = this;
        localStorage.setItem("categories", JSON.stringify(categories));
    }
}

function addNote(populateCat=false) {
    let text = document.querySelector("#note");
    let note = text.value;

    if (populateCat) {
        const listEl = document.querySelector(".list");
        const noteEl = document.createElement("div");
        noteEl.innerHTML = "<div>"+note+"</div><div id=\"delbutton\"><button onclick=\"deleteNote()\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        listEl.appendChild(noteEl);
    }
    cat.add(note);
}

function changeCategory() {
    const catname = document.querySelector("#select").value; //TODO: is this right??
    populateCategory(catname);
}

function addCategory() {
    const catname = document.querySelector("#newCategory").value;
    const categories = JSON.parse(localStorage.getItem("categories"));
    categories[catname] = new Category(catname, "#f8f6c4", "check", []);
    localStorage.setItem("categories", JSON.stringify(categories));
    updateOptions();
}

function updateOptions() {
    const selectEl = document.querySelector("#select");
    selectEl.innerHTML = "";
    const categories = JSON.parse(localStorage.getItem("categories"));
    for (const cat of Object.keys(categories)) {
        const optionEl = document.createElement("option");
        optionEl.innerHTML = cat;
        selectEl.appendChild(optionEl);
        // add all again or just if they're new?? TODO:
    }
}

function updateUser() {
    const userEl = document.querySelector("#uname");
    userEl.innerHTML = localStorage.getItem("userName");
}

updateOptions();
updateUser();
