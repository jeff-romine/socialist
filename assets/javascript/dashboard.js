var loginState;
// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyCtGKn7C12-nYfZVhDS8o94NVWQc9_ORwI",
//     authDomain: "sociallist-e325c.firebaseapp.com",
//     databaseURL: "https://sociallist-e325c.firebaseio.com",
//     projectId: "sociallist-e325c",
//     storageBucket: "sociallist-e325c.appspot.com",
//     messagingSenderId: "431074180322"
// };
// firebase.initializeApp(config);

// var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    loginState = true;
  } else {
    loginState = false;
    $(location).attr('href', 'index.html')
  }
});

var int = function(){
  $('#dashboard-display').show()
  $('#my-lists-display, #community-display, #my-profile-display, #create-list-display').hide();
};

$('document').ready(function () {
  
  int();

  $('body').on('click', '#dashboard-tab', function(){
    $('#dashboard-display').show()
    $('#my-lists-display, #community-display, #my-profile-display, #create-list-display').hide();
  });

  $('body').on('click', '#my-lists-tab', function(){
    $('#my-lists-display').show()
    $('#dashboard-display, #community-display, #my-profile-display, #create-list-display').hide();
  });

  $('body').on('click', '#community-tab', function(){
    $('#community-display').show()
    $('#my-lists-display, #dashboard-display, #my-profile-display, #create-list-display').hide();
  });

  $('body').on('click', '#my-profile-tab', function(){
    $('#my-profile-display').show()
    $('#my-lists-display, #community-display, #dashboard-display, #create-list-display').hide();
  });

  $('body').on('click', '#logout', function () {
      firebase.auth().signOut();
  });

  $('body').on('click', '#create-list-tab', function(){
    $('#create-list-display').show()
    $('#my-lists-display, #community-display, #my-profile-display, #dashboard-display').hide();
    delete sessionStorage['list-id'];
    listEditor();
  });

});