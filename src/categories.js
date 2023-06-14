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
    } catch(err) {
        if (localStorage.getItem("categories") === null) {
            localStorage.setItem("categories", JSON.stringify({"list":new Category("list", "#f8f6c4", "check", ["apples", "eggs", "pesto", "licorice"])}));
        }
        console.log(err);
        console.log("Error loading categories. Using default categories");
    }
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
    } catch(err) {
        console.log(err);
        console.log("Error submitting categories. They are saved locally");
    }
    //serv.submitCategories();
}

export {loadCategories, submitCategories, Category};