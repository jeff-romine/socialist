function listEditor() {
    // var config = {
    //     apiKey: "AIzaSyCtGKn7C12-nYfZVhDS8o94NVWQc9_ORwI",
    //     authDomain: "sociallist-e325c.firebaseapp.com",
    //     databaseURL: "https://sociallist-e325c.firebaseio.com",
    //     projectId: "sociallist-e325c",
    //     storageBucket: "sociallist-e325c.appspot.com",
    //     messagingSenderId: "431074180322"
    // };

    // firebase.initializeApp(config);

    var listId;

    var listRef;

    var appendBlank = false;

    if (sessionStorage['list-id']) {
        listId = sessionStorage['list-id'];
        listRef = listsRef.child(listId);
    }
    else {
        var listsRef = firebase.database().ref().child("lists");

        listRef = listsRef.push();
        listId = listRef.key;

        sessionStorage['list-id'] = listId;

        itemsRef = listRef.child("items");

        itemOrderRef = listRef.child("itemOrder");

        appendBlank = true;
    }

    var itemsRef = listRef.child("items");

    var itemOrderRef = listRef.child("itemOrder");

    var titleRef = listRef.child("title");

    var currentItems = {};

    var currentItemOrder = [];

    if (appendBlank) {
        appendBlankItem();
    }

    listRef.once('value', function (snapshot) {
        console.log("list.value - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
    });

    itemsRef.on('child_added', function (snapshot) {
        console.log("items.child_added - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
        // currentItems = snapshot.val();
        currentItems[snapshot.key] = snapshot.val();
        renderList();
    });

    itemsRef.on('child_removed', function (snapshot) {
        console.log("items.child_removed - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
        delete currentItems[snapshot.key];
        renderList();
    });

    itemOrderRef.on('value', function (snapshot) {
            console.log("itemOrder.value - " + snapshot.key + ": " + JSON.stringify(snapshot.val(), null, '  '));
            currentItemOrder = (snapshot.val() || []);
            renderList();
        }
    );

    function appendItem(item) {
        var itemRef = itemsRef.push(item);
        currentItemOrder.push(itemRef.key);
        itemOrderRef.set(currentItemOrder);
    }


    function renderList() {
        var listTemplate = Handlebars.compile($("#list-template").html());
        var items = currentItems || {};
        var itemOrder = currentItemOrder || [];
        var displayList = prepareDisplayList(items, itemOrder);
        var html = listTemplate(displayList);

        $("#list").html(html);
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

    function appendBlankItem() {
        appendItem(
            {
                name: "",
                description: ""
            }
        );
    }

    function targetToString(tgt) {
        return tgt.attr('data-item-id') + "." + tgt.attr('data-column') + ": " + tgt.val();
    }

    function updateColumnFromTarget(tgt) {
        var itemKey = tgt.attr('data-item-id');
        var col = tgt.attr('data-column');
        var val = tgt.val();
        currentItems[itemKey][col] = val;
        // I probably shouldn't update the whole list to change a column, but this will work for now.
        itemsRef.child(itemKey).child(col).set(val);
    }

    function removeItemById(itemId) {
        if (currentItems[itemId]) {
            var newCurrentItemOrder = currentItemOrder.filter((key) => (key != itemId));

            currentItemOrder = newCurrentItemOrder;
            itemOrderRef.set(currentItemOrder);

            var newItems = jQuery.extend(true, {}, currentItems);
            delete newItems[itemId];

            currentItems = newItems;
            itemsRef.set(currentItems);
        }
    }

    function moveItemUp(itemId) {
        var itemIdIndex = currentItemOrder.indexOf(itemId);

        if (itemIdIndex > 0) {
            var newItemOrder = currentItemOrder.slice();

            newItemOrder.splice(itemIdIndex, 1);
            newItemOrder.splice(itemIdIndex - 1, 0, itemId);

            itemOrderRef.set(newItemOrder);
        }
    }

    function moveItemDown(itemId) {
        var itemIdIndex = currentItemOrder.indexOf(itemId);

        if (itemIdIndex < (currentItemOrder.length + 1)) {
            var newItemOrder = currentItemOrder.slice();

            newItemOrder.splice(itemIdIndex, 1);
            newItemOrder.splice(itemIdIndex + 1, 0, itemId);

            itemOrderRef.set(newItemOrder);
        }
    }

    $("#list").on('click', '.move-item-up',
        (event) => {
            var tgt = $(event.currentTarget);
            var itemId = tgt.attr('data-item-id');
            console.log("move-item-up - " + itemId);
            moveItemUp(itemId);
        }
    );

    $("#list").on('click', '.move-item-down',
        (event) => {
            var tgt = $(event.currentTarget);
            var itemId = tgt.attr('data-item-id');
            console.log("move-item-down - " + itemId);
            moveItemDown(itemId);
        }
    );

    $("#list").on('click', '.delete-item',
        (event) => {
            var tgt = $(event.currentTarget);
            var itemId = tgt.attr('data-item-id');
            console.log("delete-item - " + tgt.attr('data-item-id'));
            removeItemById(itemId);
        }
    );
    $("#list").on('input', '.editable', function (event) {
        var tgt = $(event.currentTarget);
        console.log("input:  " + targetToString(tgt));
        updateColumnFromTarget(tgt);
    });

    $("#list").on('change', '.editable', function (event) {
        var tgt = $(event.currentTarget);
        console.log("change:  " + targetToString(tgt));
    });

    $("#list").on('blur', '.editable', function (event) {
        var tgt = $(event.currentTarget);
        console.log("blur:  " + targetToString(tgt));
    });

    $("#add-item").on('click', function (event) {
        appendBlankItem();
    });

    $("#title").on('input', function (event) {
        var tgt = $(event.currentTarget);
        titleRef.set(tgt.val());
    });
};



