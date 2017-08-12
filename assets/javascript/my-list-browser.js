var listsRef;

function initMyListBrowser() {

    if (listsRef) {
        listsRef.off();
    }

    listsRef = firebase.database().ref().child("lists");

    var lists = [];

    var userId = firebase.auth().currentUser.uid;

    function snapshotToRenderableList (snapshot) {
        return {id: snapshot.key, title: snapshot.val().title, userId: snapshot.val().userId};
    }

    listsRef.orderByChild('userId').startAt(userId).endAt(userId).on('child_added', function (snapshot) {
        console.log("lists.child_added - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
        lists.push(snapshotToRenderableList(snapshot));
        renderLists();
    });

    listsRef.orderByChild('userId').startAt(userId).endAt(userId).on('child_removed', function (snapshot) {
        console.log("lists.child_added - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
        var newLists = lists.filter((list) => snapshot.key !== list.id);
        lists=newLists;
        renderLists();
    });

    // This filters the lists to only show lists of the current user when a list is changed
    listsRef.orderByChild('userId').startAt(userId).endAt(userId).on('child_changed', function (snapshot) {
        console.log("lists.child_changed - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));

        var newLists = lists.map((item) => {
            if (item.id === snapshot.key) {
                return snapshotToRenderableList(snapshot);
            }
            else {
                return item;
            }
        });
        lists = newLists;
        renderLists();
    });

    var listsTemplate = Handlebars.compile($("#browse-list-template").html());

    renderLists();

    function prepareList(l) {
        return jQuery.extend(true, {editable:(l.userId === userId)},l);
    }

    function renderLists() {
        var rawLists = lists || [];

        var preparedLists = rawLists.map(prepareList);
        var html = listsTemplate(preparedLists);

        $("#browse-my-list").html(html);
    };
};

function removeListById(listId) {
    listsRef.child(listId).remove();
}

$("#browse-my-list").on('click', '.edit-list',
    (event) => {
        var tgt = $(event.currentTarget);
        var listId = tgt.attr('data-list-id');
        console.log("edit-list - " + listId);
        editList(listId);
    });

$("#browse-my-list").on('click', '.view-list',
    (event) => {
        var tgt = $(event.currentTarget);
        var listId = tgt.attr('data-list-id');
        console.log("edit-list - " + listId);
        viewList(listId);
    });

$("#browse-my-list").on('click', '.delete-list',
    (event) => {
        var tgt = $(event.currentTarget);
        var listId = tgt.attr('data-list-id');
        console.log("delete-list -" + tgt.attr('data-list-id'));
        removeListById(listId);
    }
);

// We use this firebase function to gather the information of the user once it authenticates that the user is signed in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        initMyListBrowser();
    } else {

    }
});
