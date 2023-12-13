
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  
  // TODO: Add SDKs for Firebase products that you want to use

  const firebaseConfig = {
    apiKey: "AIzaSyAHMMjoKpDcM8mTwIs_ARj8ulaM1KAbv5I",
    authDomain: "news-portal-e2edb.firebaseapp.com",
    projectId: "news-portal-e2edb",
    storageBucket: "news-portal-e2edb.appspot.com",
    messagingSenderId: "176175139230",
    appId: "1:176175139230:web:8802fb1afe71b899122e8f",
    measurementId: "G-P5GQ65F0S1"
  };

  // Initialize Firebase2
  const app = initializeApp(firebaseConfig);
  const auth=getAuth()

  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var password = document.getElementById('password');

  window.signUp=function(e){
    e.preventDefault();
    var obj={
        name:name.value,
        email:email.value,
        password:password.value,
    }
    const loginButton = document.querySelector('.form button.button');
    loginButton.classList.add('loading');

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function(success){
        alert('signup success');
        window.location.href = "/travel.html";
    })
    .catch(function(err){
        alert("error" +err)
    })
    .finally(function () {
     
      loginButton.classList.remove('loading');
    });
    console.log(obj)

  }