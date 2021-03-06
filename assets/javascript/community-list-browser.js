function initCommunityListBrowser() {

    var listsRef = firebase.database().ref().child("lists");

    var lists = [];

    var categoryVal = $('#community-category-input').val();

    var userId = firebase.auth().currentUser.uid;

    // This filters out the entire list database based on what category you have selected
    if (categoryVal === 'all') {
        listsRef.on('child_added', function (snapshot) {
            console.log("lists.child_added - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));

            if (userId != snapshot.val().userId) {
                lists.push({
                    id: snapshot.key,
                    title: snapshot.val().title
                });
                renderLists();
            };
        });
    } else {
        listsRef.orderByChild('category').startAt(categoryVal).endAt(categoryVal).on('child_added', function (snapshot) {
            console.log("lists.child_added - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));

            if (userId != snapshot.val().userId) {
                lists.push({
                    id: snapshot.key,
                    title: snapshot.val().title
                });
                renderLists();
            }
        });
    };

    if (categoryVal === 'all') {
        listsRef.on('child_changed', function (snapshot) {
            console.log("lists.child_changed - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));

            if (userId != snapshot.val().userId) {
                var newLists = lists.map((item) => {
                    if (item.id === snapshot.key) {
                        return {
                            id: snapshot.key,
                            title: snapshot.val().title
                        }
                    } else {
                        return item;
                    }
                });
                lists = newLists;
            };
        });
    } else {
        listsRef.orderByChild('category').startAt(categoryVal).endAt(categoryVal).on('child_changed', function (snapshot) {
            console.log("lists.child_changed - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));

            if (userId != snapshot.val().userId) {
                var newLists = lists.map((item) => {
                    if (item.id === snapshot.key) {
                        return {
                            id: snapshot.key,
                            title: snapshot.val().title
                        }
                    } else {
                        return item;
                    }
                });
                lists = newLists;
            };
        });
    };


    var listsTemplate = Handlebars.compile($("#browse-list-template").html());

    renderLists();

    function renderLists() {
        var items = lists || [];
        var html = listsTemplate(items);

        $("#browse-community-list").html(html);

        // super hacky but i failed at getting the handlebars if to work
        $("#browse-community-list .edit-list").hide();
        $("#browse-community-list .delete-list").hide();
    };
};

$("#browse-community-list").on('click', '.view-list',
    (event) => {
        var tgt = $(event.currentTarget);
        var listId = tgt.attr('data-list-id');
        console.log("edit-list - " + listId);
        viewList(listId);
    });

$('#community-category-input').on('input', function () {
    initCommunityListBrowser();
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        initCommunityListBrowser();
    } else {

    }
});