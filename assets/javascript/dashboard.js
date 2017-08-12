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
  $('#community-display, #my-profile-display, #dashboard-display, #create-list-display,#view-list-display').hide();
};

function openListEditor() {
  $('#create-list-display').show()
  $('#my-lists-display, #community-display, #my-profile-display, #dashboard-display, #view-list-display').hide();
  listEditor();
}

function openListViewer() {
    $('#view-list-display').show()
    $('#my-lists-display, #community-display, #my-profile-display, #dashboard-display, #create-list-display').hide();
    listViewer();
}

function viewList(listId) {
    console.log("viewList: " + listId);
    sessionStorage["view-list-id"] = listId;
    openListViewer();
}


function editList(listId) {
    console.log("editList: " + listId);
    sessionStorage["list-id"] = listId;
    openListEditor();
}

$('document').ready(function () {

  int();

  $('body').on('click', '#my-lists-tab', function(){
    $('#my-lists-display').show()
    $('#dashboard-display, #community-display, #my-profile-display, #create-list-display, #view-list-display').hide();
  });

  $('body').on('click', '#community-tab', function(){
    $('#community-display').show()
    $('#my-lists-display, #dashboard-display, #my-profile-display, #create-list-display, #view-list-display').hide();
  });

  $('body').on('click', '#my-profile-tab', function(){
    $('#my-profile-display').show()
    $('#my-lists-display, #community-display, #dashboard-display, #create-list-display, #view-list-display').hide();
  });

  $('body').on('click', '#logout', function () {
      firebase.auth().signOut();
  });

  $('body').on('click', '#create-list-tab', function(){
    delete sessionStorage['list-id'];
    openListEditor();
  });
});
