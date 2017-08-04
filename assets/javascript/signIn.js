// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCtGKn7C12-nYfZVhDS8o94NVWQc9_ORwI",
    authDomain: "sociallist-e325c.firebaseapp.com",
    databaseURL: "https://sociallist-e325c.firebaseio.com",
    projectId: "sociallist-e325c",
    storageBucket: "sociallist-e325c.appspot.com",
    messagingSenderId: "431074180322"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// calling login elements
var emailVal = $('#login-email-input').val().trim();
var passwordVal = $('#loginPasswordInput').val().trim();
var loginBtn = $('#login-btn').val().trim();

// calling signUp elements
var signUpEmailVal = $('#signup-email-input').val().trim();
var signUpPasswordVal = $('#signup-password-input').val().trim();
var signUpBtn = $('#signup-btn').val().trim();

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});


$('document').ready(function(){
    $('#login-btn').on('click', function(){
        console.log('hello');
        var email = emailVal;
        var password = passwordVal;
        var auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, password);
    });

    $('#signup-btn').on('click', function(){
        var email = signUpEmailVal;
        var password = signUpPasswordVal;
        var auth = firebase.auth();

        auth.createUserWithEmailAndPassword(email, password);
    });

    $('#my_popup').popup();
});