// Assigning names
const signinform = document.getElementById("signin-form")
const signupform = document.getElementById("signup-form")

// Sign in logic
signinform.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("signin-email").value
    const password = document.getElementById("signin-password").value
    const signinbtn = document.getElementById("signin-btn")

    if (!email || !password) {
        alert("Enter all Credentials !!!")
    }
    else {
        const handleSignin = (email, password) => {
            const users = JSON.parse(localStorage.getItem("users")) || []
            const user = users.find(user => user.email === email && user.password === password)

            if (user) {
                alert(`Welcome back ${user.name}`)
            }
            else {
                alert("Invalid credentials !!!")
            }
            signinform.reset()
        }

        handleSignin(email,password)
    }
})

function handleSignup(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExist = users.some(user => user.email === email) // User exists or not
  
    // User Exists then
    if (userExist) {
      alert("Email is already registered. Please sign in.");
      return;
    }
  
    users.push({ name, email, password })
    localStorage.setItem("users", JSON.stringify(users))
    alert("Sign-Up successful !!!");
    form.reset(); // Reset the form after successful sign-up
  
  }

// Sign up Logic
signupform.addEventListener("submit", function (e) {
    e.preventDefault()

    const email = document.getElementById("signup-email").value
    const password = document.getElementById("signup-password").value
    const name = document.getElementById("signup-name").value
    const signupbtn = document.getElementById("signup-btn")

    if (!name || !email || !password) {
        alert("Enter all Credentials !!!")
    }
    else {
        const handleSignup = (name, email, password) => {
            const users = JSON.parse(localStorage.getItem("users")) || []
            const userExist = users.some(user => user.email === email)

        if (userExist) {
            alert("Email is already registered. Please sign in.");
            return;
        }

        users.push({ name, email, password })
        localStorage.setItem("users", JSON.stringify(users))
        alert("Sign-Up successful !!!");
        signupform.reset();
        const signUpModal = bootstrap.Modal.getInstance(document.getElementById("signup-modal"))
        signUpModal.hide();
        }
        
        handleSignup(name,email,password)

    }
})