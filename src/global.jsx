import React from 'react';
import "../main.css";


export function Global({userName}) {
    const [notes, setNotes] = React.useState([]);
    const [newNote, setNewNote] = React.useState('');
        
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        addNote(msg.value,msg.from);
    };

    function addNote(note, user) {
        if (localStorage.getItem("notepad") == null) {
            localStorage.setItem("notepad", JSON.stringify([['this is the global notepad','trenchcoat'],['i wonder what I can put here?','800cows'],['anything youd like your peers to see!','sirdoug'],['beep bop','roboto']]));
        }
        let notepad = JSON.parse(localStorage.getItem("notepad"));
        notepad.push([note,user]);
        if (notepad.length>5) notepad=notepad.slice(-4);
        console.log(notepad);
        localStorage.setItem("notepad", JSON.stringify(notepad));
        const nnote = <div className="card"><a>+note+</a><br /><div class="user">+user+</div></div>
        // set notes to the last 3  most recent notes and the new note
        if (notes.length>4) setNotes(notes.slice(-3));
        setNotes(notes => [nnote, ...notes]);
    }
    
    function broadcastNote() {
        addNote(newNote,userName);
        const event = { 
            from: userName,
            value: newNote,
        };
        //socket.send(JSON.stringify(event));
    }

    return (
    <>
        <section className="global" style={{flex:2}}>
        <h1>Global Notepad</h1>
          <div className="board">
              <div className="card"> 
                <form method="get" >
                    <input type="text" id="notepadnew" placeholder="new item" onChange={(e) => setNewNote(e)}/>
                        <button type="button" onClick={broadcastNote}>Add Item</button>
                </form> </div>
                {notes}
            </div>
      </section> 
    </>);
}
