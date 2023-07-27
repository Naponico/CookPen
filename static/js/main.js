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
            div_to_del = document.getElementById('card' + id)
            $('#card'+id).fadeOut(500)
            setTimeout(function (div_to_del) { 
                div_to_del.parentNode.removeChild(div_to_del);
            }, 500,button);
            
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
        console.log(string_to_send)
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
    console.log(selectedcardid)
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
}


    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        dragSrcEl.setAttribute('value',this.getAttribute('value'))
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.setAttribute('value',e.dataTransfer.getData('value'))
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

