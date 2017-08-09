var config = {
    apiKey: "AIzaSyCtGKn7C12-nYfZVhDS8o94NVWQc9_ORwI",
    authDomain: "sociallist-e325c.firebaseapp.com",
    databaseURL: "https://sociallist-e325c.firebaseio.com",
    projectId: "sociallist-e325c",
    storageBucket: "sociallist-e325c.appspot.com",
    messagingSenderId: "431074180322"
};

firebase.initializeApp(config);

var listsRef = firebase.database().ref().child("lists");

var lists = [];

listsRef.on('child_added', function (snapshot) {
    console.log("lists.child_added - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
    lists.push({id:snapshot.key,title:snapshot.val().title});
    renderLists();
});

var listsTemplate = Handlebars.compile($("#browse-list-template").html());

function renderLists() {
    var items = lists || [];
    var html = listsTemplate(items);

    $("#list").html(html);
};

function redirectToEditor(listId) {
    sessionStorage['list-id'] = listId;
    location.replace('jeff-edit.html');
}

$("#list").on(
    'click',
    '.edit-list',
    (event) => {
        var tgt = $(event.currentTarget);
        var listId = tgt.attr('data-list-id');
    redirectToEditor(listId);
    }
);