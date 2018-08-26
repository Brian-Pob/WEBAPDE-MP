var tags = ['ded', 'dunny', 'gaming', 'technology'];

function checkIfTag() {

    if (!tags.includes(document.getElementById('searchbar').value.toLowerCase())) {
        alert("This is not a tag");
    } else {
        alert("This is a tag");
    }
    return false;
}

function changeVisibilityPrivate() {
    // console.log('Changed visibility')

    document.getElementById('inputVisibility').value = 'Private'
    return false
}

function changeVisibilityPublic() {
    // console.log('Changed visibility')

    document.getElementById('inputVisibility').value = 'Public'
    // document.getElementById('inputVisibility'). = 'Public'
    return false
}

$(":file").filestyle();