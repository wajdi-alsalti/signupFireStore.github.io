import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, getDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging.js";


var config = {
    apiKey: "AIzaSyCo3LenWQbuRk0AQ4oLi_wtWU-7PwVO9lM",
    authDomain: "firestoretest-9ab0f.firebaseapp.com",
    projectId: "firestoretest-9ab0f",
    storageBucket: "firestoretest-9ab0f.appspot.com",
    messagingSenderId: "905574811979",
    appId: "1:905574811979:web:2ec99d3afbede0413540ce",
    measurementId: "G-5XPXEF9JNM"
}

const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);
auth.useDeviceLanguage(app);

var messagingToken;


const successfullyregister = document.querySelector("#successfullyregister");
const hidebutton = document.querySelector("#hidebutton");
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;
    const displayName = signupForm["displayName"].value;

    navigator.serviceWorker.register("firebase-messaging-sw.js").then(registration => {
        getToken(messaging, {
            serviceWorkerRegistration: registration,
            // key pair from project settings cloud messaging
            vapidKey: 'BIC1HZS0PcFm_Nsv7bsUXWSX37xUBHGIt6eDFf-vSYxVw2Zx2i1WwbN0cacnu2rVQ0l-q44oz2bGzXlraXA5mqo'
        }).then((currentToken) => {
            if (currentToken) {
                messagingToken = currentToken;
                console.log("token is " + currentToken);
                // Send the token to your server and update the UI if necessary
                // ...
            } else {
                messagingToken = "No registration token available";
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    });


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            
            setDoc(doc(db, "users", user.uid), {
                username: displayName,
                email: user.email,
                token : messagingToken
            })
            signupForm.reset();
            successfullyregister.style.display = 'block';
            signupForm.style.display = 'none';
            // return true;  // Successfully created the user and set the data
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            // return false;  // Return false in case of error
        });
});

