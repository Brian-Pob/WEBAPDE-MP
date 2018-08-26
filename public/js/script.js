var tags = ['ded', 'dunny', 'gaming', 'technology'];
function checkIfTag(){
    
    if(!tags.includes(document.getElementById('searchbar').value.toLowerCase())){
        alert("This is not a tag");
    }else{
        alert("This is a tag");
    }
    return false;
}

function changeVisibility(){
    console.log('Changed visibility')

    if(document.getElementById('visibilitySetting').innerHTML === 'Public')
        document.getElementById('visibilitySetting').innerHTML = 'Private'
    else
        document.getElementById('visibilitySetting').innerHTML = 'Public'
    
        return true
}

$(":file").filestyle();