document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("create-task-form");
    const taskInput = document.getElementById("new-task-description");
    const prioritySelect = document.getElementById("priority-select");
    const taskList = document.getElementById("tasks");
    const sortButton = document.getElementById("sort-tasks");
    const dueDateInput = document.getElementById("due-date");

    const tasks = [];

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addTask(taskInput.value, prioritySelect.value, dueDateInput.value);
        taskInput.value = "";
        dueDateInput.value = "";
    });

    function addTask(description, priority, dueDate) {
        const task = {
            id: Date.now(),
            description,
            priority,
            dueDate,
        };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = ""; // Clear the existing tasks
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.description} (Due: ${task.dueDate})`;
            li.style.color = getPriorityColor(task.priority);
            li.id = task.id;

        // Bonus!!!/ Add a checkbox to the task rendering function
       const checkbox = document.createElement("input");
       checkbox.type = "checkbox";
       checkbox.checked = task.completed; // Assuming `completed` is a property
       checkbox.addEventListener("change", () => {
        task.completed = !task.completed;
        renderTasks();
});
li.appendChild(checkbox);

            // Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editTask(task.id));

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteTask(task.id));

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    function deleteTask(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }

    function editTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            taskInput.value = task.description;
            prioritySelect.value = task.priority;
            dueDateInput.value = task.dueDate;
            deleteTask(taskId); // Remove the task before editing
        }
    }

    function getPriorityColor(priority) {
        switch (priority) {
            case 'high':
                return 'red';
            case 'medium':
                return 'yellow';
            case 'low':
                return 'green';
            default:
                return 'black';
        }
    }
    
    sortButton.addEventListener("click", () => {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
        renderTasks();
    });
});
