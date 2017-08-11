var refLists = firebase.database().ref('lists')

$('document').ready(function(){
    
    $('body').on('click', '#filter-search-btn', function(){
        refLists.orderByChild('category').startAt('shopping').endAt('shopping').on('value', function(filterSnap){
            console.log(filterSnap.val())
        })
    });
});