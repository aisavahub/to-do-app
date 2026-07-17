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
