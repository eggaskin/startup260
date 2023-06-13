import React from 'react';
import "../main.css";
import {submitCategories} from "./categories";

export function Notes({catname}) {
    const [cat, setCat] = React.useState(catname);
    const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("categories"))[cat].notes);
    const [newnote, setNewNote] = React.useState("");

    function addNote() {
        let nootes = notes;
        nootes.push(newnote);
        setNotes(nootes);
        setNewNote("");

        let categories = JSON.parse(localStorage.getItem("categories"));
        categories[cat].notes.push(newnote);
        localStorage.setItem("categories", JSON.stringify(categories));
        submitCategories();
        console.log("adding note");
    }

    function removeNote(note) {
        let nootes = notes;
        nootes = nootes.filter((el) => el != note);
        setNotes(nootes);

        let categories = JSON.parse(localStorage.getItem("categories"));
        categories[cat].note = nootes;
        localStorage.setItem("categories", JSON.stringify(categories));
        submitCategories();
    }

    //TODO: how to style all notes?

    function getNotes() {
        const noteEls = [];
        for (let i = 0; i < notes.length; i++) {
            noteEls.push(<div key={i}><div className="note">{notes[i]}</div>
            <div id="delbutton">
                <button type="button" onClick={()=>{removeNote(notes[i])}}>
                    <img src="delete.png" alt="Delete" width="25vw" height="25vw" />
                        </button></div></div>);
        }
        return noteEls;
    }

    return (<section className="notelist" >
        <div id="title"> {cat} </div>
        <div className="list">
            {getNotes()}
            <div id="add">
                <div><input type="text" id="note" value={newnote} onChange={(e) => {setNewNote(e.target.value)}} placeholder="New Item" /></div>
                <div id="additem">
                    <button type="button" onClick={addNote}>Add Item</button></div>
            </div>
        </div>
    </section>);
}
