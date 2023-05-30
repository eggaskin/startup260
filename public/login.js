
function login() {
    const nameEl = document.querySelector("#username");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "login.html"; //TODO: what does this do
}  

function updateUser() {
    const userEl = document.querySelector("#uname");
    if (localStorage.getItem("userName") == null) {
        localStorage.setItem("userName", "Anon")
    } 
    userEl.innerHTML = localStorage.getItem("userName");
}

updateUser();