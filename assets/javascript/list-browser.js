var listsRef = firebase.database().ref().child("lists");

var lists = [];

listsRef.on('child_added', function (snapshot) {
    console.log("lists.child_added - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
    lists.push({id: snapshot.key, title: snapshot.val().title});
    renderLists();
});

listsRef.on('child_changed', function (snapshot) {
    console.log("lists.child_changed - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));

    var newLists = lists.map((item) => {
        if (item.id === snapshot.key) {
            return {id: snapshot.key, title: snapshot.val().title}
        }
        else {
            return item;
        }
    });
    lists = newLists;
    renderLists();
});

var listsTemplate = Handlebars.compile($("#browse-list-template").html());

function renderLists() {
    var items = lists || [];
    var html = listsTemplate(items);

    $("#browse-list").html(html);
};

// function redirectToEditor(listId) {
//     sessionStorage['list-id'] = listId;
//     location.replace('jeff-edit.html');
// }
//
//
// $("#browse-list").on(
//     'click',
//     '.edit-list',
//     (event) => {
//         var tgt = $(event.currentTarget);
//         var listId = tgt.attr('data-list-id');
//         redirectToEditor(listId);
//     }
// );