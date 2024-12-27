let users = JSON.parse(localStorage.getItem("users"))
console.log(users);

let currentuser = ""

users.forEach(user => {
    if (user.loggedIn === true) {
        if (currentuser === ""){
            currentuser = user.name
        }
        else{
            currentuser.loggedIn = "false"
            currentuser = user.name
        }
        console.log(user)
        const signinbtntext = document.querySelector(".signin-text")
        signinbtntext.innerText = user.name
    }
});