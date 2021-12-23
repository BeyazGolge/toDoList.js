
let toDoS = [];
getFromLocalStorage();
renderList(toDoS);
let successToast = document.getElementById("successToast");
let errorToast = document.getElementById("errorToast");
function newElement(){
    let input = document.getElementById("task");
    if(input.value =="")
    {
        console.log("empty");
        $(document).ready(function(){
            $('.toast.error').toast('show');
          });
        return;
    }
    else{
        const id = Date.now();
        toDoS.push(
            {
                id:id,
                input: input.value,
                completed: false
            }
        )
        addToLocalStorage(toDoS);
        $(document).ready(function(){
            $('.toast.success').toast('show');
          });
        console.log(toDoS);
        input.value = "";
    }
};

function done(id){
    toDoS.map(item => {
        if(item.id == id)
        {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(toDoS);

};

function deleteItem(id)
{
    console.log(id);
    console.log(toDoS);
    toDoS = toDoS.filter((item) => {return item.id !=id;});
    console.log(toDoS);
    addToLocalStorage(toDoS);
}

function addToLocalStorage(todos)
{
    localStorage.setItem("todos",JSON.stringify(todos));
    renderList(toDoS);
}

function getFromLocalStorage()
{
    const reference = localStorage.getItem("todos");
    if(reference)
    {
        toDoS = JSON.parse(reference);
    }
    return toDoS;
}

function renderList(toDoList)
{
    let ul = document.getElementById("list");
    ul.innerHTML = ``;
    toDoList.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `
        <p>${item.input}</p>
        <p class="close float-right" onclick = deleteItem(this.parentNode.id)>x</p>
        `;
        if(item.completed)
        {
            li.classList.add("checked");
        }
        else{
            li.classList.remove("checked");
        }
        li.setAttribute("onClick","done(this.id)");
        li.setAttribute("id",item.id);
        ul.appendChild(li);
    });
}
