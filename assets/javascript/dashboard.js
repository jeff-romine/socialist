var loginState;

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
  $('#my-lists-display').show()
  $('#community-display, #my-profile-display, #create-list-display').hide();
};

function openListEditor() {
  $('#create-list-display').show()
  $('#my-lists-display, #community-display, #my-profile-display, #dashboard-display').hide();
  listEditor();
}

$('document').ready(function () {

  int();

  $('body').on('click', '#my-lists-tab', function(){
    $('#my-lists-display').show()
    $('#dashboard-display, #community-display, #my-profile-display, #create-list-display').hide();
    initMyListBrowser();
  });

  $('body').on('click', '#community-tab', function(){
    $('#community-display').show()
    $('#my-lists-display, #dashboard-display, #my-profile-display, #create-list-display').hide();
    initCommunityListBrowser();
  });

  $('body').on('click', '#my-profile-tab', function(){
    $('#my-profile-display').show()
    $('#my-lists-display, #community-display, #dashboard-display, #create-list-display').hide();
  });

  $('body').on('click', '#logout', function () {
      firebase.auth().signOut();
  });

  $('body').on('click', '#create-list-tab', function(){
    delete sessionStorage['list-id'];
    openListEditor();
  });

});
