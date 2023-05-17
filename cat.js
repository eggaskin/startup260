
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


function populateCategory(catname) {
    const listEl = document.querySelector(".list");
    const categories = JSON.parse(localStorage.getItem("categories"));
    const cat = categories[catname]; //TODO: this might be undefined
    const notes = cat.notes;

    for (const [i, note] of notes.entries()) {
        const noteEl = document.createElement("div");
        noteEl.innerHTML = "<div>"+note+"</div><div id=\"delbutton\"><button onclick=\"deleteNote()\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        listEl.appendChild(noteEl);
    }
    doStyle(cat.color,cat.style);
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

function deleteNote() {
    const listEl = document.querySelector(".list");
    listEl.removeChild(this); //TODO: fix this, get the right one
    cat.delete(note);
}

function getStyle() {
    const color = document.querySelector("#color").value;
    const format = document.querySelector("input[name=\"format\"]:checked").value;
    doStyle(color,format);
    cat.style(color,format);
}

function doStyle(color,format) {
    // change background color of cat items
    // change format of cat items
    const divEls = document.querySelectorAll(".list > div");
    for (const [i, div] of divEls.entries()) {
        div.style.backgroundColor = color;
        if (format == "check") {
            //TODO: add checkbox
            div.innerHTML = "<div>"+div.innerHTML+"</div><div id=\"delbutton\"><button onclick=\"deleteNote()\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        } else {
            div.innerHTML = "<div>"+div.innerHTML+"</div><div id=\"delbutton\"><button onclick=\"deleteNote()\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        }
    }
    //.list > div  background-color change to color
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

if (localStorage.getItem("categories") == null) {
    localStorage.setItem("categories", JSON.stringify({"grocery list":new Category("grocery list", "#f8f6c4", "check", ["apples", "eggs", "pesto", "licorice"])}));
}
const switchCat = document.querySelector("#switchcat");
switchCat.addEventListener("click", changeCategory());
updateOptions();