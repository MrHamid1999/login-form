// getting sign-in and sign-up form
const signInForm = document.querySelector(".sign-in");
const signUpForm = document.querySelector(".sign-up");
// getting the headers wich are on top pf forms
let changer = document.querySelector(".headers").children;
// adding click event to headers for changing type of forms
Array.from(changer).forEach(span => {
    span.addEventListener("click" , e => {
        // add clciked class to header on click
        e.target.classList.add("clicked");
        // changing the style of forms on click
        if (e.target.classList.contains("sign-up-part")) {
            signUpForm.style.display = "flex";
            signInForm.style.display = "none";
        } else {
            signUpForm.style.display = "none";
            signInForm.style.display = "flex";
        }
        // if the header is not the one wich has been clicked remove class
        Array.from(changer).forEach(w => {
            if (w != e.target) {
                w.classList.remove("clicked")
    
         }
        })
    })
});

// validation inner values in sign up form
let fs = 0;
// validating user name
signUpForm.username.addEventListener("keyup" , e => {
    
    let userName = e.target;
  
    let valuser =/^[a-zA-Z][\w.w_]{5,25}$/.test(userName.value) ? 1 : 0 ;
    console.log(valuser);
    if (valuser ) {
        userName.classList.add("success");
        fs++
    }else{
        userName.classList.remove("success");
        
    }
})

// validating password
let pc ;
signUpForm.password.addEventListener("keyup" , e => {
    let pass = e.target.value;
    pc = 0
    if(pass){
        pc += /[A-Z]/.test(e.target.value) ? 1 : 0;
		pc += /[a-z]/.test(e.target.value) ? 1 : 0;
		pc += /[\W]/.test(e.target.value) ? 1 : 0;
		pc += /[0-9]/.test(e.target.value) ? 1 : 0;
		pc += e.target.value.length >= 6 ? 1 : 0;
        
        if (pc == 5) {
            e.target.classList.add("success");
            fs++;
        } else {
            e.target.classList.remove("success")
            
        }
    }
    
})

// re-type password validation
signUpForm.password2.addEventListener("keyup" , e => {
    if(e.target.value == signUpForm.password.value)
    {
        e.target.classList.add("success");
        fs++
    }else{
        e.target.classList.remove("success")

    }
})
// gettin data from local storage
let users =localStorage.getItem('users');
users = JSON.parse(users);
console.log(users);
try {
    console.log(users);
    users = users.length ? users : null ;
} catch (e) {
    users = null;
}
if (!users) {
    users = [{userName : "hio" , password : "123456"}];
    
} 

localStorage.setItem("users" , JSON.stringify(users))

// getting inner values and saving them 
signUpForm.addEventListener("submit" , e => {
    console.log(fs);
    if (fs < 3) {
        e.preventDefault()
    }else{
       
       users = JSON.parse(localStorage.getItem("users"));
       let newUser = {
           userName : signUpForm.username.value ,
           password : signUpForm.password.value
       }
        Array.from(users).forEach( user => {
            if (user.userName == newUser.userName) {
                e.preventDefault()
                alert("your username already exist");
                newUser = null
            }
        })
        
        users.push(newUser);
        console.log(users);
        localStorage.setItem("users" , JSON.stringify(users));
    }
})

// log in with local storage data 

signInForm.addEventListener("submit" , e => {
    const logInUser = signInForm.username;
    const logInPass = signInForm.password;
    if (!logInUser.value || !logInPass.value) {
        e.preventDefault()
        alert("complete the items")
    }
    let indexUser;
    Array.from(users).forEach((user , index) => {
        if (logInUser.value.match(user.userName)) {
            indexUser = index ;
        }
    })
     users = Array.from(users)
    if (indexUser == undefined) {
        e.preventDefault
    } else if(logInPass.value !=users[indexUser].password ){
        
    }
})