import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase,ref,update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmNExTV5gaczHbcsrTXjNvab7vmug0rIw",
  authDomain: "authentication-app-2de5b.firebaseapp.com",
  databaseURL: "https://authentication-app-2de5b-default-rtdb.firebaseio.com",
  projectId: "authentication-app-2de5b",
  storageBucket: "authentication-app-2de5b.appspot.com",
  messagingSenderId: "932491620237",
  appId: "1:932491620237:web:5a2f2038c025dd3a8997c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth();

var signIn = document.getElementById("signin-form");
signIn.addEventListener('submit',(e)=>{
    e.preventDefault();
   var email = document.getElementById("email").value;
   var password = document.getElementById("password").value;
   var username = document.getElementById("username").value ;
   signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const date = new Date();
    update(ref(database,'users/'+ user.uid),{
      last_login : date
   })
   location.replace("index.html");
   alert("Sign in successfully!!");
   document.getElementById("signin-form").reset();

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

})



function forgotPass(){
  const email = document.getElementById("email").value;
 sendPasswordResetEmail(email)
   .then(() => {
     // Password reset email sent!
     // ..
     alert("Password reset link sent to your email successfully!!");
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     alert(errorMessage);
     // ..
   })
 }
 
