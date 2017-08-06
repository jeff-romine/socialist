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

var itemsRef = listRef.child("items");

var itemOrderRef = listRef.child("itemOrder");

var currentItems;
var currentItemOrder = [];

// listRef.on('child_added', function (snapshot) {
//     console.log("list.child_added");
//     console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
//
// });

// itemsRef.on('child_added', function (snapshot) {
//     console.log("items.child_added");
//     console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
// });

function appendToItemOrder(itemKey) {
    currentItemOrder.push(itemKey);
    itemOrderRef.set(currentItemOrder);
};

// itemsRef.on('child_removed', function (snapshot) {
//     console.log("items.child_removed");
//     console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
//     removeFromItemOrder(snapshot.key);
// });

function removeFromItemOrder(removeKey) {
    if (currentItemOrder) {
        currentItemOrder = currentItemOrder.filter(function (itemKey) {
            itemKey !== removeKey
        });
        itemOrderRef.set(currentItemOrder);
    }
};

// itemsRef.on('child_changed', function (snapshot) {
//     console.log("items.child_changed");
//     console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
// });

itemsRef.on('value', function (snapshot) {
    console.log();
    console.log("items.value - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
    currentItems = snapshot.val();
    renderList();
});

function appendItem(item) {
    var initialItemRef = itemsRef.push(
        item);

    currentItemOrder.push(initialItemRef.key);
    itemOrderRef.set(currentItemOrder);
}

// itemOrderRef.on('child_added', function (snapshot) {
//         console.log("itemOrder.child_added");
//         console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
//     }
// );

// itemOrderRef.on('child_removed', function (snapshot) {
//         console.log("itemOrder.child_removed");
//         console.log(snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
//     }
// );

itemOrderRef.on('value', function (snapshot) {
        console.log();
        console.log("itemOrder.value - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
        currentItemOrder = snapshot.val();
        renderList();
    }
);

console.log("list-template: " + $("#list-template").html());

function renderList() {
    if (currentItems) {
        // TODO Try initializing listTemplate in document ready listener
        var listTemplate = Handlebars.compile($("#list-template").html());
        var displayList = prepareDisplayList(currentItems, currentItemOrder);
        var html = listTemplate(displayList);

        $("#list").html(html);
    }
}

function prepareDisplayList(items, itemOrder) {
    return itemOrder.filter(
        function (itemKey) {
            return items[itemKey];
        })
        .map(function (itemKey, index) {
            var item = jQuery.extend(
                true,
                {
                    id: itemKey,
                    number: index + 1
                },
                items[itemKey]);

            item.number = index + 1;
            item.key = itemKey;
            return item;
        });
}

function appendBlankItem () {
    appendItem(
        {
            name: "",
            description: ""
        }
    );
}

appendBlankItem();

function targetToString(tgt) {
    return tgt.attr('data-item-id') + "." + tgt.attr('data-column') + ": " + tgt.val();
}
$("#list").on('input', '.editable', function (event) {
    var tgt = $(event.currentTarget);
    console.log("input:  " + targetToString(tgt));
});

$("#list").on('change', '.editable', function (event) {
    var tgt = $(event.currentTarget);
    console.log("change:  " +  targetToString(tgt));
    
});
$("#list").on('blur', '.editable', function (event) {
    var tgt = $(event.currentTarget);
    console.log("blur:  " +  targetToString(tgt));
});

$("#add-item").on('click',function (event) {
    appendBlankItem();
});