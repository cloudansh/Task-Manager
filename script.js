document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Check if dark mode was previously enabled
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.textContent = "☀️";
    }

    // Toggle dark mode
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.textContent = "☀️";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.textContent = "🌙";
        }
    });

    // Function to create a new task item
    function createTaskItem(taskText) {
        const li = document.createElement('li');
        li.classList.add('task-item', 'fade-in'); // Add animation class

        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = taskText;

        // Toggle completed state on click
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';
        
        // Fade-out effect before deleting
        deleteBtn.addEventListener('click', () => {
            li.classList.add('fade-out');
            setTimeout(() => li.remove(), 300); // Remove after animation
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }

    // Function to add a new task
    function addTask() {
        const taskValue = taskInput.value.trim();
        if (taskValue !== '') {
            const taskItem = createTaskItem(taskValue);
            
            // Append task with a slight delay to trigger animation
            setTimeout(() => {
                taskList.appendChild(taskItem);
            }, 50);

            taskInput.value = '';
            taskInput.focus();
        }
    }

    // Event listeners for adding tasks
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
