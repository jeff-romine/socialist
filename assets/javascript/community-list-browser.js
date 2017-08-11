function initCommunityListBrowser(){

    var listsRef = firebase.database().ref().child("lists");

    var lists = [];


    var userId = firebase.auth().currentUser.uid;
    

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
    });

    var listsTemplate = Handlebars.compile($("#browse-list-template").html());

    renderLists();

    function renderLists() {
        var items = lists || [];
        var html = listsTemplate(items);

        $("#browse-community-list").html(html);
    };

    $("#browse-community-list").on('click', '.edit-list',
                (event) => {
                  var tgt = $(event.currentTarget);
                  var listId = tgt.attr('data-list-id');
                  console.log("edit-list - " + listId);
                  editList(listId);
                });

  function editList(listId) {
    console.log("editList: " + listId);
    sessionStorage["list-id"] = listId;
    openListEditor();
  }
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    initCommunityListBrowser();
  } else {

  }
});