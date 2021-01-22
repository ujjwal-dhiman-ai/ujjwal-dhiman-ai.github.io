//if user adds a note, add it to a local storage
window.onload = function () {
    let addBtn = document.getElementById('addBtn');
    addBtn.addEventListener("click", function (e) {

        let addTlt = document.getElementById("addTlt");
        let titles = localStorage.getItem("titles");
        if(titles == null)
            titleObj = [];
        else 
            titleObj = JSON.parse(titles);
        titleObj.push(addTlt.value);
        localStorage.setItem("titles", JSON.stringify(titleObj));
        addTlt.value = "";

        let addTxt = document.getElementById("addTxt");
        let notes = localStorage.getItem("notes");
        if (notes == null) 
            notesObj = [];
        else 
            notesObj = JSON.parse(notes);
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj)); // convert object into string
        addTxt.value = "";
        showNotes();
    })
}

function showNotes() {
    let notes = localStorage.getItem("notes"); // notes = array in form of string ("[]")
    if (notes == null) 
        notesObj = [];  // simple array
    else 
        notesObj = JSON.parse(notes);  // parse/convert string into object  

    let titles = localStorage.getItem("titles");
    if(titles == null)
        titleObj = [];
    else 
        titleObj = JSON.parse(titles);

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body" style="color: black;">
                    <h5 class="card-title" >${titleObj[index]}</h5>
                    <hr>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0)
        notesElm.innerHTML = html;
    else
        notesElm.innerHTML = `Nothing to show`;
}

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null)
        notesObj = [];
    else
        notesObj = JSON.parse(notes);    
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    let titles = localStorage.getItem("titles");
    if(titles == null)
        titleObj = [];
    else 
        titleObj = JSON.parse(titles);
    titleObj.splice(index,1);
    localStorage.setItem("titles", JSON.stringify(titleObj));
    showNotes();   
}