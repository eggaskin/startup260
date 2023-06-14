import React from 'react';
import "../main.css";

export function Notepad({addNote}) {
    const [newnote, setNewNote] = React.useState("");
    function adddNote() {
        addNote(newnote);
        setNewNote("");
    }

    return (<div id="notepad" style={{flex:1.5}}>
    <input type="text" id="note" onChange={(e) => {setNewNote(e.target.value)}} value={newnote} placeholder="Make your note here" />
    <button onClick={adddNote} type="button">Note it</button>
</div>);
}
