export function updateTaskCount(taskCount, tasks) {
    const completed = tasks.filter(task => task.completed).length;
    taskCount.textContent = `${tasks.length} Tasks | ${completed} Completed`;
}

export function renderTasks(
    tasks,
    currentFilter,
    taskList,
    taskCount
) {
    taskList.innerHTML = "";

    const emptyMessage = document.getElementById("emptyMessage");

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
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

        const li = document.createElement("li");
        li.classList.add("task-item");
        li.dataset.index = realIndex;

        const taskSpan = document.createElement("span");
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

    updateTaskCount(taskCount, tasks);
}