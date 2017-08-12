var refLists = firebase.database().ref('lists')

$('document').ready(function(){
    
    $('body').on('click', '#filter-search-btn', function(){
        refLists.orderByChild('category').startAt($('#categoryInput')).endAt('#categoryInput')).on('value', function(filterSnap){
            console.log(filterSnap.val())
        })
    });
});