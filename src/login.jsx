import React from 'react';
import '../main.css';

// import { Unauthenticated } from './Unauthenticated';
// import { Authenticated } from './authenticated';
// import { AuthState } from './authState';
// { userName, authState, onAuthChange }
export function Login({onAuthChange}) {
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function doUser(method) {
        console.log(user);
        const response = await fetch(method, {
            method: 'post',
            body: JSON.stringify({ uname: user, password: password }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response.ok) {
            localStorage.setItem('userName', user);
            window.location.href = 'main';
            onAuthChange(user, AuthState.Authenticated);
        } else {
            const body = await response.json();
            alert(`Error!  ${body.msg}`);
        }
    }

    return ( 
        <main>
        <div className='container'>
        <div className='postit' id='login' style={{flex:2}}>
        <h1>Login</h1>
        <form method="get" action="index.html">
              <input type="text" id="username" onChange={(u)=>setUser(u.target.value)} placeholder="username" />
              <input type="password" id="password" onChange={(u)=>setPassword(u.target.value)} placeholder="*******" />
          <button type="button" onClick={() => doUser('/noted/login')}>Login</button>
          <button type="button" onClick={() => doUser('/noted/createuser')}>New</button>
        </form>
        </div>
        <div style={{flex:5}}>
            <h1 className="BESTYLED">About</h1>
            <p className="bestyled"> Noted is meant to get rid of the need to find your notes in a sea of other notes.
            Instead of having to search through your whole notes app to find where to mark down some new idea,
            immediately add it to a category and view it there later.
            </p></div>
        </div>
        <h1 className="BESTYLED">How to Use</h1>
        <p className="bestyled">Use Noted by adding individual notes to a certain category over time,
            and viewing these notes in their respective categories.
            Use the home page, the notepad, to write a note and select a category to add it to,
            or make a new category.</p>
            <p className="bestyled">View these categories and edit them on the categories page.
            You can also delete categories and their notes from this page.</p>
        <p className="bestyled">The Global Notepad is at the base of the Categories page and you can add notes to be
        seen by all users here. It only displays the most recent 4 notes, and the author's username.</p>
    </main>
    );
}

function updateUser(uname) {
    if (localStorage.getItem("userName") == null) {
        localStorage.setItem("userName", "Anon")
    } 
    uname = localStorage.getItem("userName");
}

