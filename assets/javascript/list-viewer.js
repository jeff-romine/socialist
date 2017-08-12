
var viewListId;

var viewListRef;

var viewListId;

function listViewer() {
    var newViewListId = sessionStorage['view-list-id'];

    if (viewListId && (newViewListId === viewListId)) {
        console.log("same view-list-id: " + viewListId);
        return;
    }

    if (viewListRef) {
        viewListRef.off();
    }

    viewListId = newViewListId;

    viewListRef = firebase.database().ref().child("lists").child(viewListId);

    viewListRef.on('value', function(snapshot) {
        viewRenderList(snapshot.val());
    });
};

function titleCase(string) {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    else {
        return "";
    }
}

function viewRenderList(list) {
    var viewListTemplate = Handlebars.compile($("#view-list-template").html());
    $('#view-list-title').html(titleCase(list.title));
    $('#view-list-category').html(titleCase(list.category));

    var preparedDisplayList = viewPrepareDisplayList(list.items,list.itemOrder);
    var html = viewListTemplate(preparedDisplayList);
    $("#view-list").html(html);
}

function viewPrepareDisplayList(items, itemOrder) {
    return itemOrder.filter(
        function (itemKey) {
            return items[itemKey];
        })
        .map(function (itemKey, index) {
            return jQuery.extend(
                true,
                {
                    id: itemKey,
                    number: index + 1
                },
                items[itemKey]);
        });
}
