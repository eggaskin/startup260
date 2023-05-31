
class Category {
    constructor(name, color, style, notes) {
        this.name = name;
        this.color = color;
        this.style = style;
        this.notes = notes;
    }

    // style(color,style) {
    //     this.color = color;
    //     this.style = style;
    //     // update local storage
    //     const categories = JSON.parse(localStorage.getItem("categories"));
    //     categories[this.name] = this;
    //     localStorage.setItem("categories", JSON.stringify(categories));
    // }
}

async function loadCategories() {
    try {
        const response = await fetch('/note/cats');
        let cats = await response.text();
        if (cats == "") {
            cats = `{"grocery list":{"name":"grocery list","color":"#f8f6c4","style":"check","notes":["apples","eggs","pesto","licorice"]}}`;
        }
        localStorage.setItem("categories", cats);
    } catch {
        if (localStorage.getItem("categories") === null) {
            localStorage.setItem("categories", JSON.stringify({"grocery list":new Category("grocery list", "#f8f6c4", "check", ["apples", "eggs", "pesto", "licorice"])}));
        }
    }
    updateOptions();
    return localStorage.getItem("categories");
}

async function submitCategories() {
    const categories = localStorage.getItem("categories");
    try {
        const response = await fetch('/note/savecat', {
            method: 'POST',
            body: categories,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const cats = await response.text();
        // console.log(cats);
        //const cats = await response.json();
        //localStorage.setItem("categories", JSON.stringify(cats));
    } catch {
        console.log("Error submitting categories. They are saved locally");
    }
}

// let cat = new Category("test", "red", "list", ["test1", "test2", "test3"]);
function getCurrentCat() {
    // const catname = document.querySelector("#title").innerHTML;
    const catname = localStorage.getItem("currentCat");
    let categories = JSON.parse(localStorage.getItem("categories"));
    return [categories, categories[catname], catname];
}

function populateCategory(catname) {
    let categories = JSON.parse(localStorage.getItem("categories"));
    if (categories[catname]==undefined) {
        // set catname to first category
        catname = Object.keys(categories)[0];
        localStorage.setItem("currentCat", catname);
    }
    const titleEl = document.querySelector("#title");
    titleEl.innerHTML = catname;
    const listEl = document.querySelector(".list");
    listEl.innerHTML = "";
    const notes = categories[catname].notes;

    for (const [i, note] of notes.entries()) {
        const noteEl = document.createElement("div");
        noteEl.innerHTML = "<div>"+note+"</div><div id=\"delbutton\"><button type=\"button\" onclick=\"deleteNote.call(this)\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        listEl.appendChild(noteEl);
    }
    const addEl = document.createElement("div");
    addEl.innerHTML = `<form method="get" action="category.html">
    <div><input type="text" id="note" placeholder="New Item" /></div>
        <div id="additem"><button type="button" onclick="addNote(true)">Add Item</button></div>
</form>`;
    addEl.id = "add";
    listEl.appendChild(addEl);
    doStyle(categories[catname].color);
    // TODO:
    fetch("https://www.colr.org/json/color/random",{cache: "reload"})
    .then((response) => response.json())
    .then((data) => {
        const color = data.new_color;
        document.querySelector("#color").value = "#"+color;
    });
}

function addNote(populateCat=false) {
    let text = document.querySelector("#note");
    let note = text.value;
    // delete last chid element (add button)
    const listEl = document.querySelector(".list");
    listEl.removeChild(listEl.lastChild);

    if (populateCat) {
        const listEl = document.querySelector(".list");
        const noteEl = document.createElement("div");
        noteEl.innerHTML = "<div>"+note+"</div><div id=\"delbutton\"><button type=\"button\" onclick=\"deleteNote.call(this)\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        listEl.appendChild(noteEl);
    }
    const addEl = document.createElement("div");
    addEl.innerHTML = `<form method="get" action="category.html">
    <div><input type="text" id="note" placeholder="New Item" /></div>
        <div id="additem"><button type="button" onclick="addNote(true)">Add Item</button></div>
</form>`;
    addEl.id = "add";
    listEl.appendChild(addEl);
    // get current category
    let [categories,cat,catname] = getCurrentCat();
    // cat.add(note);
    cat.notes.push(note);
    // update local storage
    categories[catname] = cat;
    doStyle(cat.color);
    localStorage.setItem("categories", JSON.stringify(categories));
    submitCategories();
}

function deleteNote() {
    const listEl = document.querySelector(".list");
    const parentDiv = this.parentNode.previousElementSibling;
    const noteEl = parentDiv.innerHTML;
    listEl.removeChild(parentDiv.parentNode); 
    let [categories,cat,catname] = getCurrentCat();
    cat.notes = cat.notes.filter((el) => el != noteEl);
    categories[catname] = cat;
    localStorage.setItem("categories", JSON.stringify(categories));
    submitCategories();
}

function getStyle() {
    const color = document.querySelector("#color").value;
    // const format = document.querySelector("input[name=\"format\"]:checked").value;
    doStyle(color,change=true);
}

function doStyle(color,change=false) {
    // change background color of cat items
    // change format of cat items
    const divEls = document.querySelectorAll(".list > div");
    const inEl = document.querySelector(".list input");
    inEl.style.backgroundColor = newShade(color,+0.4); 
    //TODO: also button colors
    for (const [i, div] of divEls.entries()) {
        div.style.backgroundColor = color;
        div.style.borderColor = newShade(color,-0.35);
    }
    let [categories,cat,catname] = getCurrentCat();
    // cat.style = format;
    cat.color = color;
    categories[catname] = cat;
    localStorage.setItem("categories", JSON.stringify(categories));
    if (change) {
        submitCategories();
    }
    //.list > div  background-color change to color
}

// credit to https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
// https://www.sitepoint.com/javascript-generate-lighter-darker-color/
function newShade(hex, lum) {
    // validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

function changeCategory() {
    // console.log("category changed");
    const catname = document.querySelector("#select").value;
    localStorage.setItem("currentCat", catname);
    populateCategory(catname);
    //change checked values!!
}

function addCategory() {
    const catname = document.querySelector("#newCategory").value;
    const categories = JSON.parse(localStorage.getItem("categories"));
    categories[catname] = new Category(catname, "#f8f6c4", "check", []);
    localStorage.setItem("categories", JSON.stringify(categories));
    updateOptions();
    submitCategories();
}

function deleteCategory() {
    const catname = document.querySelector("#title").innerHTML;
    let categories = JSON.parse(localStorage.getItem("categories"));
    delete categories[catname];
    // categories = categories.filter((el) => el != catname); //TODO:
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("currentCat", Object.keys(categories)[0]);
    updateOptions();
    submitCategories(); 
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
    selectEl.value = localStorage.getItem("currentCat");
    // cat = categories[selectEl.value];
    populateCategory(selectEl.value);
}

function updateUser() {
    const userEl = document.querySelector("#uname");
    if (localStorage.getItem("userName") == null) {
        localStorage.setItem("userName", "Anon")
    } 
    userEl.innerHTML = localStorage.getItem("userName");
}


if (localStorage.getItem("currentCat") == null) {
    localStorage.setItem("currentCat", "grocery list");
}
loadCategories();
const switchCat = document.querySelector("#switchcat");
switchCat.addEventListener("click", ()=>changeCategory());
updateUser();
