const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

let currentFilter = "all";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task count
function updateTaskCount() {
    taskCount.textContent = `${tasks.length} Tasks`;
}

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

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Display tasks
function renderTasks() {

    taskList.innerHTML = "";

    const emptyMessage =
    document.getElementById("emptyMessage");

    if (tasks.length === 0) {
        emptyMessage.style.display =
        "block";
    } else {
        emptyMessage.style.display = "none";
    }
    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task) => {

        const realIndex = tasks.indexOf(task);

        const li = 
        document.createElement("li");
        li.classList.add("task-item");
        li.dataset.index = realIndex;

        const taskSpan = 
        document.createElement("span");
        taskSpan.textContent = task.text;
        taskSpan.classList.add("task-text");

        if (task.completed) {
            taskSpan.classList.add("completed");
        }

       

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateTaskCount();
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

        saveTasks();
        renderTasks();
    }

    // Mark task complete
    if (e.target.classList.contains("task-text")) {

        tasks[index].completed = !tasks[index].completed;

        saveTasks();
        renderTasks();
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
    renderTasks();
});

activeBtn.addEventListener("click", () => {
    currentFilter = "active";
    renderTasks();
});

completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    renderTasks();
});

// Load saved tasks when page opens
renderTasks();
