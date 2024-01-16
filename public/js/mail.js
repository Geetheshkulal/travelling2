// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyASlNI2Hn4Z55760Mde6rmCo3JOTH-GsXM",
    authDomain: "travelling-8b6fa.firebaseapp.com",
    databaseURL: "https://travelling-8b6fa-default-rtdb.firebaseio.com",
    projectId: "travelling-8b6fa",
    storageBucket: "travelling-8b6fa.appspot.com",
    messagingSenderId: "778024792345",
    appId: "1:778024792345:web:fa72ac14dc73d27a37d588",
    measurementId: "G-Z1HN1JRLVB"
  };

  firebase.initializeApp(firebaseConfig);

  //refernce to data base
  const contactFormDB = firebase.database().ref("contactForm");

  document.getElementById('contactForm').addEventListener('submit', submitForm);

  function submitForm(e) {
    e.preventDefault();

    var email = getElementVal('email');  
    var phone = getElementVal('phone');
    var message = getElementVal('message');

    //to check empty

    if (!email || !phone || !message) {
        alert("All fields must be filled!");
        return;
    }

    saveMessage(email, phone, message); //call function

    // console.log(email, phone, message);
    document.querySelector(".alert").style.display='block';

    // remove alert
    setTimeout(()=>{
        document.querySelector(".alert").style.display='none';
    }, 3000);

    //reset
    document.getElementById('contactForm').reset();
}
const saveMessage =(email, phone, message)=>{
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        email : email,
        phone : phone,
        message : message,
    })
};
  const getElementVal = (id)=>{
    return document.getElementById(id).value;

  }