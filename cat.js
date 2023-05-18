
class Category {
    constructor(name, color, style, notes) {
        this.name = name;
        this.color = color;
        this.style = style;
        this.notes = notes;
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

// let cat = new Category("test", "red", "list", ["test1", "test2", "test3"]);
function getCurrentCat() {
    // const catname = document.querySelector("#title").innerHTML;
    const catname = localStorage.getItem("currentCat");
    let categories = JSON.parse(localStorage.getItem("categories"));
    return [categories, categories[catname], catname];
}

function populateCategory(catname) {
    const titleEl = document.querySelector("#title");
    titleEl.innerHTML = catname;
    const listEl = document.querySelector(".list");
    listEl.innerHTML = "";
    let categories = JSON.parse(localStorage.getItem("categories"));
    const notes = categories[catname].notes;

    for (const [i, note] of notes.entries()) {
        const noteEl = document.createElement("div");
        noteEl.innerHTML = "<div>"+note+"</div><div id=\"delbutton\"><button onclick=\"deleteNote.call(this)\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        listEl.appendChild(noteEl);
    }
    const addEl = document.createElement("div");
    addEl.innerHTML = `<form method="get" action="category.html">
    <div><input type="text" id="note" placeholder="New Item" /></div>
        <div id="additem"><button onclick="addNote(true)">Add Item</button></div>
</form>`;
    addEl.id = "add";
    listEl.appendChild(addEl);
    // FIX STYLING! TODO:
    doStyle(categories[catname].color,categories[catname].style);
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
    let [categories,cat,catname] = getCurrentCat();
    // cat.add(note);
    cat.notes.push(note);
    // update local storage
    categories[catname] = cat;
    localStorage.setItem("categories", JSON.stringify(categories));
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
}

function getStyle() {
    const color = document.querySelector("#color").value;
    const format = document.querySelector("input[name=\"format\"]:checked").value;
    doStyle(color,format);
}

function doStyle(color,format) {
    // change background color of cat items
    // change format of cat items
    const divEls = document.querySelectorAll(".list > div");
    const inEl = document.querySelector(".list input");
    inEl.style.backgroundColor = newShade(color,+0.4); 
    //TODO: also button colors
    for (const [i, div] of divEls.entries()) {
        div.style.backgroundColor = color;
        div.style.borderColor = newShade(color,-0.35);
        if (format == "check") {
            //TODO: add checkbox
            //div.innerHTML = "<div>"+div.innerHTML+"</div><div id=\"delbutton\"><button onclick=\"deleteNote.call(this)\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        } else {
            //div.innerHTML = "<div>"+div.innerHTML+"</div><div id=\"delbutton\"><button onclick=\"deleteNote.call(this)\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        }
    }
    let [categories,cat,catname] = getCurrentCat();
    cat.style = format;
    cat.color = color;
    categories[catname] = cat;
    localStorage.setItem("categories", JSON.stringify(categories));
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
    console.log("category changed");
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
}

function deleteCategory() {
    const catname = document.querySelector("#title").innerHTML;
    let categories = JSON.parse(localStorage.getItem("categories"));
    delete categories[catname];
    // categories = categories.filter((el) => el != catname); //TODO:
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("currentCat", Object.keys(categories)[0]);
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
    }
    selectEl.value = localStorage.getItem("currentCat");
    // cat = categories[selectEl.value];
    populateCategory(selectEl.value);
}

function updateUser() {
    const userEl = document.querySelector("#uname");
    userEl.innerHTML = localStorage.getItem("userName");
}

if (localStorage.getItem("categories") == null) {
    localStorage.setItem("categories", JSON.stringify({"grocery list":new Category("grocery list", "#f8f6c4", "check", ["apples", "eggs", "pesto", "licorice"])}));
}
if (localStorage.getItem("currentCat") == null) {
    localStorage.setItem("currentCat", "grocery list");
}

const switchCat = document.querySelector("#switchcat");
switchCat.addEventListener("click", ()=>changeCategory());
updateOptions();
updateUser();
