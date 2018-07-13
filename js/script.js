var tags = ['ded', 'dunny', 'gaming', 'technology'];
function checkIfTag(){
    
    if(!tags.includes(document.getElementById('searchbar').value.toLowerCase())){
        alert("This is not a tag");
    }else{
        alert("This is a tag");
    }
    return false;
}