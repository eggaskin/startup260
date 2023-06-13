import React from 'react';
import "../main.css";
import {Notepad} from "./notepad";
import {CatSelect} from "./catSelect";
import {Global} from "./global";
import {submitCategories, Category} from "./categories"

export function Main({userName}) {
    const [catname, setCat] = React.useState('list');
    
    function addNote(note) {
        // add note to cat
        let categories = JSON.parse(localStorage.getItem("categories"));
        if (categories[catname]==undefined) {
            // set catname to first category
            setCat(Object.keys(categories)[0]);
            localStorage.setItem("currentCat", catname);
        }
        let cat = categories[catname];
        // cat.add(note);
        cat.notes.push(note);
        // update local storage
        categories[catname] = cat;
        localStorage.setItem("categories", JSON.stringify(categories));
        // clear input
        submitCategories();
        return;
    }

    function changeCat(name,newcat=False) {
        if (newcat) {
            // add new category
            const categories = JSON.parse(localStorage.getItem("categories"));
            categories[name] = new Category(name, "#f8f6c4", "check", []);
            localStorage.setItem("categories", JSON.stringify(categories));
            //TODO:    updateOptions();
            submitCategories();
        } else {
            setCat(name)
        }
    }
    // need Notepad, CatSelect, Global components

    return (
    <main>
        <div className="container" id="notepadcontainer">
            <Notepad cat={catname} addNote={addNote} />
            <CatSelect newCat={true} clickFunc={changeCat} />
        </div>
        {/* <Global userName={userName}/> */}
    </main>);
}
