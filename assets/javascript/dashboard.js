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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    loginState = true;
  } else {
    loginState = false;
    $(location).attr('href', 'index.html')
  }
});

$('document').ready(function () {

    $('body').on('click', '#logout', function () {
        firebase.auth().signOut();
    });

    $('body').on('click', '#add-list-btn', function(){
        $('#main-content').attr('w3-include-html', 'test.html');
    });

});