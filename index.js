document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("create-task-form");
    const taskInput = document.getElementById("new-task-description");
    const prioritySelect = document.getElementById("priority-select");
    const taskList = document.getElementById("tasks");
    const sortButton = document.getElementById("sort-tasks");
    const dueDateInput = document.getElementById("due-date");

    const tasks = [];

    // Event listener for form submission
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addTask(taskInput.value, prioritySelect.value, dueDateInput.value);
        taskInput.value = "";
        dueDateInput.value = "";
    });

    // Function to add a task
    function addTask(description, priority, dueDate) {
        const task = {
            id: Date.now(),
            description,
            priority,
            dueDate,
            completed: false, // Initialize completed state
        };
        tasks.push(task);
        renderTasks();
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = ""; // Clear existing tasks
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.description} (Due: ${task.dueDate})`;
            li.style.color = getPriorityColor(task.priority);
            li.id = task.id;

            // Create checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed; // Reflect completed state
            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked; // Update completed state
                renderTasks(); // Rerender tasks
            });
            li.appendChild(checkbox);

            // Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editTask(task.id));
            li.appendChild(editButton);

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteTask(task.id));
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });
    }

    // Function to delete a task
    function deleteTask(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }

    // Function to edit a task
    function editTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            taskInput.value = task.description;
            prioritySelect.value = task.priority;
            dueDateInput.value = task.dueDate;
            deleteTask(taskId); // Remove the task before editing
        }
    }

    // Function to get color based on priority
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

    // Event listener for sorting tasks
    sortButton.addEventListener("click", () => {
        tasks.sort((a, b) => {
            // Sorting primarily by priority, then by due date
            if (a.priority === b.priority) {
                return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date
            }
            return a.priority.localeCompare(b.priority); // Sort by priority
        });
        renderTasks();
    });
});
