import { saveTasks, loadTasks } from "./storage.js";
import { renderTasks } from "./ui.js";


const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const successMessage = document.getElementById("successMessage");
const clearBtn = document.getElementById("clearBtn")

let currentFilter = "all";

let tasks = loadTasks();



// Add a task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks(tasks);
    renderTasks(
        tasks,
            currentFilter,
            taskList,
            taskCount
    );

    successMessage.textContent = "Task Added Successfully";

    successMessage.style.opacity = "1";
    setTimeout(() => {
        successMessage.style.opacity ="0";
    }, 2000);

    taskInput.value = "";
}


taskList.addEventListener("click", (e) => {
   console.log(e.target);
    const li = e.target.closest("li");
    if (!li) return;

    const index = Number(li.dataset.index);

    // Delete task
    if (e.target.classList.contains("delete-btn")) {

        const confirmDelete = confirm("Are you sure you want to delete this task?");

        if (!confirmDelete) return;

        tasks.splice(index, 1);

        saveTasks(tasks);
        renderTasks(
            tasks,
            currentFilter,
            taskList,
            taskCount
        );
    }

    // Mark task complete
    if (e.target.classList.contains("task-text")) {

        tasks[index].completed = !tasks[index].completed;

        saveTasks(tasks);
        renderTasks(
            tasks,
            currentFilter,
            taskList,
            taskCount
        );
    }

});

// Button click
addBtn.addEventListener("click", addTask);

// Enter key
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

allBtn.addEventListener("click", () => {
    currentFilter = "all";
    renderTasks(
        tasks,
            currentFilter,
            taskList,
            taskCount
    );
});

activeBtn.addEventListener("click", () => {
    currentFilter = "active";
    renderTasks(
        tasks,
            currentFilter,
            taskList,
            taskCount
    );
});

completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    renderTasks(
        tasks,
            currentFilter,
            taskList,
            taskCount
    );
});

// Load saved tasks when page opens
renderTasks(
    tasks,
            currentFilter,
            taskList,
            taskCount
);

clearBtn.addEventListener("click", () => {

    if(tasks.length === 0){
        alert("No tasks to clear.");
        return
    }
    const confirmClear = 
    confirm("Delete all tasks?");

    if(!confirmClear) return;
    tasks = [];
    saveTasks(tasks);
    renderTasks(
        tasks,
            currentFilter,
            taskList,
            taskCount
    )
})