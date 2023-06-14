import React from 'react';
import "../main.css";
import {submitCategories} from "./categories";

export function Notes({catname}) {
    // const [cat, setCat] = React.useState(catname);
    const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("categories"))[catname].notes);
    const [newnote, setNewNote] = React.useState("");

    function addNote() {
        let nootes = notes;
        nootes.push(newnote);
        setNotes(nootes);
        setNewNote("");

        let categories = JSON.parse(localStorage.getItem("categories"));
        // console.log("adding note to "+catname);
        categories[catname].notes.push(newnote);
        localStorage.setItem("categories", JSON.stringify(categories));
        submitCategories();
    }

    function removeNote(note) {
        let nootes = JSON.parse(localStorage.getItem("categories"))[catname].notes;
        nootes = nootes.filter((el) => el != note);
        setNotes(nootes);

        let categories = JSON.parse(localStorage.getItem("categories"));
        categories[catname].notes = nootes;
        localStorage.setItem("categories", JSON.stringify(categories));
        submitCategories();
    }

    //TODO: how to style all notes?

    function getNotes() {
        let nnotes = JSON.parse(localStorage.getItem("categories"))[catname].notes;
        const noteEls = [];
        for (let i = 0; i < nnotes.length; i++) {
            noteEls.push(<div key={i}><div className="note">{nnotes[i]}</div>
            <div id="delbutton">
                <button type="button" onClick={()=>{removeNote(nnotes[i])}}>
                    <img src="/delete.png" alt="Delete" width="25vw" height="25vw" />
                        </button></div></div>);
        }
        return noteEls;
    }

    function getCat() {
        return catname;
    }

    return (<section className="notelist" >
        <div id="title"> {getCat()} </div>
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
