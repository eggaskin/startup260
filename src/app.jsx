import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login';
import { Cat } from './cat';
import { Main } from './main';
import { AuthState } from './authState';
import '../main.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const user = authState === AuthState.Authenticated ? userName : 'Anon';
  return (
    <BrowserRouter>
      <div >
        <header>
          <nav className='navbar'>
          <img src="https://cdn-icons-png.flaticon.com/512/686/686112.png" alt="logo" width={50} className="img-fluid" />
            <NavLink className='nav-active' to='main'>Notepad</NavLink>
            <NavLink className='nav-active' to='cat'>Categories</NavLink>
            <NavLink className='nav-active' to='login'>Login/About</NavLink>
            <button className="userdisplay" >Hi,  {user} </button>

            {/* <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Login
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='play'>
                    Play
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='scores'>
                    Scores
                  </NavLink>
                </li>
              )}
              <li className='nav-item'>
                <NavLink className='nav-link' to='about'>
                  About
                </NavLink>
              </li>
            </menu> */}
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Main userName={userName}/>} />
          <Route path='/main' element={<Main userName={userName} />} />
          <Route path='/cat' element={<Cat userName={userName}/>} />
          <Route path='/login' element={<Login onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
        <a>Created by Evelyn Gaskin</a>
        <br></br>
        <a href="https://github.com/eggaskin/startup260">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}

export default App;
