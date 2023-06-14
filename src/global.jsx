import React from 'react';
import "../main.css";
import {globalSystem} from "./globalSystem";

export function Global({userName}) {
    const [notes, setNotes] = React.useState(
        JSON.parse(localStorage.getItem("notepad"))||
        [['this is the global notepad','trenchcoat'],['i wonder what I can put here?','800cows'],['anything youd like your peers to see!','sirdoug'],['beep bop','roboto']]);
    const [newNote, setNewNote] = React.useState('');

    if (localStorage.getItem("notepad") == null) {
        localStorage.setItem("notepad", JSON.stringify(notes));
    }
    const [noteEls, setNoteEls] = React.useState(notes.map((note) => <div key={note[0]} className="card"><a>{note[0]}</a><br /><div className="user">{note[1]}</div></div>));

    let nnoteEls = noteEls;

    React.useEffect(() => {
        globalSystem.use(addNote);
      });
    // const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    // const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    
    // socket.onmessage = async (event) => {
    //     const msg = JSON.parse(await event.data.text());
    //     addNote(msg.value,msg.from);
    // };

    function addNote(note, user) {
        if (localStorage.getItem("notepad") == null) {
            localStorage.setItem("notepad", JSON.stringify([['this is the global notepad','trenchcoat'],['i wonder what I can put here?','800cows'],['anything youd like your peers to see!','sirdoug'],['beep bop','roboto']]));
        }
        // let notepad = JSON.parse(localStorage.getItem("notepad"));
        let notepad = notes;
        if (notepad.length>=4) {
            notepad=notepad.slice(-3);
        }
        notepad.push([note,user]);
        console.log(notepad);
        localStorage.setItem("notepad", JSON.stringify(notepad));
        // const nnote = <div key={note} className="card"><a>{note}</a><br /><div className="user">{user}</div></div>
            // set notes to the last 3  most recent notes and the new note
        // if (notes.length>4) setNotes(notes.slice(-3));
        //=> [nnote, ...notepad]
        setNotes(notepad );
        nnoteEls = getNotes(notepad);
        setNoteEls(nnoteEls);
    }

    function getNotes(notepad) {
        const nootes = [];
        for (let i=0;i<notepad.length;i++) {
            const nnote = <div key={i} className="card"><a>{notepad[i][0]}</a><br /><div className="user">{notepad[i][1]}</div></div>
            nootes.push(nnote);
        }
        return nootes;
    }
    
    function broadcastNote() {
        globalSystem.broadcastNote(newNote,userName);
        addNote(newNote,userName);
        setNewNote('');
    }

    return (
    <>
        <section className="global" style={{flex:2}}>
        <h1>Global Notepad</h1>
          <div className="board">
              <div className="card"> 
                <form method="get" >
                    <input type="text" id="notepadnew" value={newNote} placeholder="new item" onChange={(e) => setNewNote(e.target.value)}/>
                        <button type="button" onClick={broadcastNote}>Add Item</button>
                </form> </div>
                {noteEls}
            </div>
      </section> 
    </>);
}
