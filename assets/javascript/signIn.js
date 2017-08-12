var loginState;
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

// firebase finds when the login status is and directs them to the proper page
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    loginState = true;
    $(location).attr('href', 'dashboard.html');
  } else {
    loginState = false;
  }
});

$('document').ready(function () {
  
  // when logging in it changes the login state to true
  $('body').on('click', '#login-btn', function (event) {
    event.preventDefault();

    console.log('hello');
    // calling login elements
    var emailVal = $('#login-email-input').val().trim();
    var passwordVal = $('#login-password-input').val().trim();

    var email = emailVal;
    var password = passwordVal;
    var auth = firebase.auth();

    auth.signInWithEmailAndPassword(email, password);

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  });


  // creates an account with email and password given and also changes login status to true
  $('#signup-btn').on('click', function (event) {
    event.preventDefault()
    // calling signUp elements
    var signUpEmailVal = $('#signup-email-input').val().trim();
    var signUpPasswordVal = $('#signup-password-input').val().trim();
    var email = signUpEmailVal;
    var password = signUpPasswordVal;
    var auth = firebase.auth();

    auth.createUserWithEmailAndPassword(email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  });
});