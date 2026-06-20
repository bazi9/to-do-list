// Wait for the entire HTML to load before running logic
document.addEventListener('DOMContentLoaded', () => {
    
    // Load tasks from browser memory, or start with an empty list
    let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Save to memory and refresh the screen
    function updateApp() {
        localStorage.setItem('todo_tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Draw the tasks onto the HTML
    function renderTasks() {
        taskList.innerHTML = ''; 

        if (tasks.length === 0) {
            taskList.innerHTML = '<div class="alert alert-info">No tasks yet. Add one above!</div>';
            return;
        }

        tasks.forEach((task, index) => {
            // 1. Create the Main Task Row
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-secondary mt-3';

            const taskHeader = document.createElement('div');
            taskHeader.className = 'd-flex justify-content-between align-items-center';

            const title = document.createElement('h4');
            title.className = 'mb-0 text-dark';
            title.textContent = task.title;

            // 2. Create the Subtask Input and '+' Button
            const subtaskForm = document.createElement('div');
            subtaskForm.className = 'subtask-form';

            const subInput = document.createElement('input');
            subInput.type = 'text';
            subInput.className = 'form-control form-control-sm';
            subInput.placeholder = 'Add subcategory...';

            const subBtn = document.createElement('button');
            subBtn.className = 'btn btn-success btn-sm font-weight-bold';
            subBtn.textContent = '+';
            
            // Add subtask logic
            subBtn.onclick = () => {
                const subText = subInput.value.trim();
                if (subText) {
                    tasks[index].subtasks.push(subText);
                    updateApp();
                }
            };

            subtaskForm.appendChild(subInput);
            subtaskForm.appendChild(subBtn);
            taskHeader.appendChild(title);
            taskHeader.appendChild(subtaskForm);
            li.appendChild(taskHeader);
            taskList.appendChild(li);

            // 3. Draw the Subcategories below the Main Task
            if (task.subtasks.length > 0) {
                task.subtasks.forEach(subtask => {
                    const subLi = document.createElement('li');
                    subLi.className = 'list-group-item sub-task d-flex align-items-center';
                    subLi.innerHTML = `<span class="mr-2 text-muted">&#x21B3;</span> ${subtask}`;
                    taskList.appendChild(subLi);
                });
            } else {
                const emptyLi = document.createElement('li');
                emptyLi.className = 'list-group-item text-muted sub-task font-italic';
                emptyLi.textContent = 'No subcategories added yet.';
                taskList.appendChild(emptyLi);
            }
        });
    }

    // Add Main Task Logic
    addTaskBtn.addEventListener('click', () => {
        const title = taskInput.value.trim();
        if (title) {
            tasks.push({ title: title, subtasks: [] });
            taskInput.value = '';
            updateApp();
        }
    });

    // Let the user hit "Enter" on their keyboard to add a task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTaskBtn.click();
    });

    // Run this once when the page loads
    renderTasks();
});
