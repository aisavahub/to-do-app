console.log("JavaScript is woking")
const taskInput =
document.getElementById("taskInput");
const addBtn =
document.getElementById("addBtn");
const taskList =
document.getElementById("taskList");

// To add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskTest === "") {
        alert("Please enter a task.");
        return;
    }

    // create list item
    const li = document.createElement("li");
    li.classList.add("task-item");

    // create task text
    const taskSpan =
    document.createElement("span");
    taskSpan.textContent = taskText;

    //Toggle completed when clicked
    taskSpan.addEventListener("click",
        function (){
            taskSpan.classList.toggle("completed");
        });

    // Delete button
    const deleteBtn =
    document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // delete task
    deleteBtn.addEventListener("click",
        function () {
            li.remove();
        });

    // Adding element to list items
li.appendChild(taskSpan);
li.appendChild(deleteBtn);

   // Adding task to task list
   taskList.appendChild(li);

   // Clear input
   taskInput.value = "";

   taskInput.focus();
}

// To add task when button is clicked
addBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keydown", 
    function(event) {
        if (event.key === "Enter"){
            addTask();
        }
    });