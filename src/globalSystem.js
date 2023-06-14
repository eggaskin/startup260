class GlobalSystem {
    handler = null;
    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
 
        this.socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            this.addNote(msg.value,msg.from);
        };
    }

    // addNote(note, user) {
    //     if (localStorage.getItem("notepad") == null) {
    //         localStorage.setItem("notepad", JSON.stringify([['this is the global notepad','trenchcoat'],['i wonder what I can put here?','800cows'],['anything youd like your peers to see!','sirdoug'],['beep bop','roboto']]));
    //     }
    //     let notepad = JSON.parse(localStorage.getItem("notepad"));
    //     notepad.push([note,user]);
    //     if (notepad.length>5) notepad=notepad.slice(-4);
    //     console.log(notepad);
    //     localStorage.setItem("notepad", JSON.stringify(notepad));
    //     const nnote = <div className="card"><a>+note+</a><br /><div class="user">+user+</div></div>
    //     // set notes to the last 3  most recent notes and the new note
    //     if (notes.length>4) setNotes(notes.slice(-3));
    //     setNotes(notes => [nnote, ...notes]);
    // }

    broadcastNote(note, user) {
        const event = { 
            from: user,
            value: note,
        };
        this.socket.send(JSON.stringify(event));
    }

    use(newfunc) {
        this.addNote = newfunc;
    }
}

const globalSystem = new GlobalSystem();
export {globalSystem};