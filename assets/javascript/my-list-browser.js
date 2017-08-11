function initMyListBrowser(){

    var listsRef = firebase.database().ref().child("lists");

    var lists = [];


    var userId = firebase.auth().currentUser.uid;
    

    listsRef.orderByChild('userId').startAt(userId).endAt(userId).on('child_added', function (snapshot) {
        console.log("lists.child_added - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
        lists.push({id: snapshot.key, title: snapshot.val().title});
        renderLists();
    });

    listsRef.orderByChild('userId').startAt(userId).endAt(userId).on('child_changed', function (snapshot) {
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

        $("#browse-my-list").html(html);
    };
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    initMyListBrowser();
  } else {

  }
});