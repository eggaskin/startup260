//const serv = require('./cat.js');
class Category {
    constructor(name, color, style, notes) {
        this.name = name;
        this.color = color;
        this.style = style;
        this.notes = notes;
    }
}

async function loadCategories() {
    //return serv.loadCategories();
    try {
        const response = await fetch('/note/cats');
        let cats = {};
        if (response.ok) {
            cats = await response.json();
        } else {
            const body = await response.json();
            // display body.msg - popup??
            alert("Error! "+ body.msg);
            cats = {"list":{"name":"list","color":"#f8f6c4","style":"check","notes":["apples","eggs","pesto","licorice"]}};
        }
        // delete cats["_id"];
        if (cats == "") {
            cats = {"list":{"name":"list","color":"#f8f6c4","style":"check","notes":["apples","eggs","pesto","licorice"]}};
        }
        localStorage.setItem("categories", JSON.stringify(cats));
    } catch {
        if (localStorage.getItem("categories") === null) {
            localStorage.setItem("categories", JSON.stringify({"list":new Category("list", "#f8f6c4", "check", ["apples", "eggs", "pesto", "licorice"])}));
        }
        console.log(err);
        console.log("Error loading categories. Using default categories");
    }
    updateOptions();
    return localStorage.getItem("categories");
}

async function submitCategories() {
    const categories = localStorage.getItem("categories"); //stringified JSON
    try {
        const response = await fetch('/note/savecats', {
            method: 'POST',
            body: categories,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            let cats = await response.json();
        } else {
            const body = await response.json();
            // display body.msg - popup??
            alert("Error! "+ body.msg);
        }
        //console.log(cats);
    } catch {
        console.log("Error submitting categories. They are saved locally");
    }
    //serv.submitCategories();
}


// function getCurrentCat() {
//     // const catname = document.querySelector("#title").innerHTML;
//     const catname = localStorage.getItem("currentCat");
//     let categories = JSON.parse(localStorage.getItem("categories"));
//     return [categories, categories[catname], catname];
// }

function addNote(populateCat=false) {
    let text = document.querySelector("#note");
    let note = text.value;

    if (populateCat) {
        const listEl = document.querySelector(".list");
        const noteEl = document.createElement("div");
        noteEl.innerHTML = "<div>"+note+"</div><div id=\"delbutton\"><button type=\"button\" onclick=\"deleteNote.call(this)\"><img src=\"delete.png\" alt=\"Delete\" width=\"25vw\" height=\"25vw\"></button></div>";
        listEl.appendChild(noteEl);
    }
    // get current category
    let catname = document.querySelector("#select").value;
    let categories = JSON.parse(localStorage.getItem("categories"));
    if (categories[catname]==undefined) {
        // set catname to first category
        catname = Object.keys(categories)[0];
        localStorage.setItem("currentCat", catname);
    }
    let cat = categories[catname];
    // cat.add(note);
    cat.notes.push(note);
    // update local storage
    categories[catname] = cat;
    localStorage.setItem("categories", JSON.stringify(categories));
    // clear input
    text.value = "";
    submitCategories();
}

function addCategory() {
    const catname = document.querySelector("#newCategory").value;
    const categories = JSON.parse(localStorage.getItem("categories"));
    categories[catname] = new Category(catname, "#f8f6c4", "check", []);
    localStorage.setItem("categories", JSON.stringify(categories));
    updateOptions();
    document.querySelector("#newCategory").value = "";
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
}

function updateUser() {
    const userEl = document.querySelector("#uname");
    if (localStorage.getItem("userName") == null) {
        localStorage.setItem("userName", "Anon")
    } 
    userEl.innerHTML = localStorage.getItem("userName");
}

function getUser() {
    return localStorage.getItem("userName");
}

function updateNotepad() {
    const boardEl = document.querySelector(".board");
    // remove last 4 child elements
   while (boardEl.childElementCount > 1) {
        boardEl.removeChild(boardEl.lastChild);
    }
    // boardEl.innerHTML = `<div class="card"> 
    // <form method="get" >
    //     <input type="text" id="notepadnew" placeholder="new item" />
    //         <button onclick="addNotepad()">Add Item</button>
    // </form> </div>`;
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
    // const notepad = JSON.parse(localStorage.getItem("notepad"));
    // notepad.push([newNote,getUser()]);
    // localStorage.setItem("notepad", JSON.stringify(notepad));
    // clear text value
    addManual(newNote,getUser())
    document.querySelector("#notepadnew").value = "";
    broadcastNote(getUser(),newNote);
}

if (localStorage.getItem("notepad") == null) {
    localStorage.setItem("notepad", JSON.stringify([['this is an inspirational quote','trenchcoat'],['i wonder what I can put here?','800cows'],['i like eggs','sirdoug'],['beep bop','roboto']]));
}
if (localStorage.getItem("currentCat") == null) {
    localStorage.setItem("currentCat", "list");
}
loadCategories();
updateUser();
updateNotepad();

function addManual(note,user) {
    let notepad = JSON.parse(localStorage.getItem("notepad"));
    notepad.push([note,user]);
    if (notepad.length>5) notepad=notepad.slice(-4);
    console.log(notepad);
    localStorage.setItem("notepad", JSON.stringify(notepad));
    updateNotepad();
}

// setInterval(() => {
//     // list of random messages
//     const randmessages = ["this is a random message", "i'm a little teapot", "go cougs", "what wonderful weather", "i need a recipe for cookies","tea?"];
//     const randusers = ["HAL","inigo montoya","justsomeguy", "800cows", "sirdoug", "robot","clyde", "prof"];
//     addManual(randmessages[Math.floor(Math.random() * randmessages.length)],randusers[Math.floor(Math.random() * randusers.length)]);
//     updateNotepad();
//   }, 5000);

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

function configureWebSocket() {
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        addManual(msg.value,msg.from);
    };
}

function broadcastNote(from, value) {
    const event = { 
        from: from,
        value: value,
    };
    socket.send(JSON.stringify(event));
}

configureWebSocket();