const tocheck=["Milk","Gluten","Fructose","Saccharose","Mais","Levure"]
var selectedcardid = undefined

function onclickbehaviour() { 
    if (confirm("Voulez-vous supprimez cette recette ?")) {
        formdata = new FormData();
        formdata.append("value",selectedcardid.replace("card",""))
        fetch("/deleterecipe/"+selectedcardid.replace("card",""), {
            method: "POST",
        }).then(function () { 
            id = selectedcardid.replace("card","")
            div_to_del = document.getElementById(selectedcardid)
            $('#card'+id).fadeOut(500)
            location.reload();
        });
    }
}
 
function sendCreateForm() { 
    if ($('#inputName').val() == "") {
        alert("La recette dois avoir un nom");
    }
    else if (document.getElementById('inputFile').files.length==0) { 
        alert("La recette dois avoir une image");
    }
    else if ($('#inputName').val() != "" && document.getElementById('inputFile').files.length != 0) {
        $("#createModalClose").click()
        string_to_send=""
        for(text of tocheck){
            if ($('#have' + text).is(':checked')) {
                string_to_send=string_to_send + "," + text
            }
        }
        let formdata = new FormData();
        formdata.append("allerg",string_to_send)
        formdata.append("name", document.getElementById("inputName").value);
        formdata.append("desc", $("#inputContent").val());
        formdata.append("file", document.getElementById('inputFile').files[0]);
        fetch("/createrecette/", {
            method: "POST",
            body: formdata,
        });
        setTimeout(function () { location.reload },1000)
    }
}


function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}
function handleDragEnd(e) {
    this.style.opacity = '1';
    items.forEach(function (item) {
        item.classList.remove('over');
    });
}


function handleDragStart(e) {
    this.style.opacity = '0.4';
    selectedcardid = this.id
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
}
    return false;
}

function deleteOver(e) { 
    this.classList.add('over');
}

$(document).ready(function () {
    button = document.getElementById('delete-recipe')
    button.addEventListener('drop', onclickbehaviour,false)
    button.addEventListener('dragover', handleDragOver, false)
    button.addEventListener('dragstart', handleDragStart, false);
    button.addEventListener('dragenter', handleDragEnter, false);
    button.addEventListener('dragleave', handleDragLeave, false);
})



let items = document.querySelectorAll('.container .card');
items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragend', handleDragEnd, false);
});

