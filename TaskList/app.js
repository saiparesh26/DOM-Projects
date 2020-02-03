//Define UI var

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load Event Listener
loadEventListener();

//Load Event Listener
function loadEventListener(){
    //DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);

    //add task event
    form.addEventListener("submit", addTask);

    //remove task event
    taskList.addEventListener("click",removeTask);

    //clear tasks
    clearBtn.addEventListener("click", clearTasks);

    //filter tasks
    filter.addEventListener("keyup",filterTasks);

}

//Add task
function addTask(e){
    if(taskInput.value === ""){
        alert("Add a task");
    }

    // Create li eleemnt
    const li = document.createElement("li");

    //Add class
    li.className = "collection-item"

    //Create text node
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement("a");

    //add class
    link.className = "delete-item secondary-content";

    //add icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append the li to ul
    taskList.appendChild(li);

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = "";

    e.preventDefault();
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        // console.log(e.target);
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }        
    }    
}

//remove from LS
function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
    // taskList.innerHTML = "";  1st way

    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksFromLocalStorage();
}

//clear tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // console.log(text);

    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    });
}

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Get tasks on load of document from LS

function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){
        // Create li eleemnt
    const li = document.createElement("li");

    //Add class
    li.className = "collection-item"

    //Create text node
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement("a");

    //add class
    link.className = "delete-item secondary-content";

    //add icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append the li to ul
    taskList.appendChild(li);
    });
}