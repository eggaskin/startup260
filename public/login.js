
function login() {
    doUser('/note/login');
}  

function createuser() {
    doUser('/note/createuser');
}

async function doUser(method) {
    const name = document.querySelector("#username").value;
    const pass = document.querySelector("#password").value;
    const response = await fetch(method, {
        method: 'post',
        body: JSON.stringify({ uname: name, password: pass }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    if (response.ok) {
        localStorage.setItem('userName', name);
        window.location.href = 'index.html';
    } else {
        const body = await response.json();
        // display body.msg - popup??
        alert("Error! "+ body.msg);
    }
    
}

function updateUser() {
    const userEl = document.querySelector("#uname");
    if (localStorage.getItem("userName") == null) {
        localStorage.setItem("userName", "Anon")
    } 
    userEl.innerHTML = localStorage.getItem("userName");
}

updateUser();