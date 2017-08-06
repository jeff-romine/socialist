var loginState;
var itemArray = [];
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    loginState = true;
  } else {
    loginState = false;
    $(location).attr('href', 'index.html')
  }
});

var checklistPreviewFunc = function(){
    for (var i = 0; i < itemArray.length; i++){
        var tr = $('<tr>');

        tr.append(itemArray[i]);
        $('#list-preview-display').append(tr);
    }
}

$('document').ready(function(){
    
    $('body').on('click', '#add-item-btn', function(){
        event.preventDefault();
        console.log('hello');
        var listItem = $('#input-list-item').val().trim();
        itemArray.push(listItem);
        $('#list-preview-display').empty();
        checklistPreviewFunc();
    });

});