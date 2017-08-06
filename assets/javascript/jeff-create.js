

$(document).ready(function () {
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
    var listRef = listsRef.push();

    var list = {
        id: listRef.key,
    };

    listRef.set(list);

    listRef.on('value',function (snapshot) {
        console.log('lists.value');
        console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(),null,'  '));
    });

    var itemsRef = listRef.child("items").push(
        {
            title: "",
            description:""
        }
    );

    listRef.on('child_added',function (snapshot) {
        console.log("list.child_added");
        console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(),null,'  '));
    });

    itemsRef.on('child_added',function (snapshot) {
        console.log("items.child_added");
        console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(),null,'  '));
    });

    itemsRef.child("items").on('child_added',function (snapshot) {
        console.log("items.child_added");
        console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(),null,'  '));
    });

    itemsRef.child("items").on('child_changed',function (snapshot) {
        console.log("items.child_changed");
        console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(),null,'  '));
    });

});
