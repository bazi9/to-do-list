document.addEventListener('DOMContentLoaded', () => {
    
    // Load tasks from browser memory
    let rawTasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

    // Upgrade old saved tasks (which were just text) into objects that can hold a "completed" status
    let tasks = rawTasks.map(task => {
        return {
            title: task.title,
            completed: task.completed || false,
            subtasks: task.subtasks.map(st => typeof st === 'string' ? { title: st, completed: false } : st)
        };
    });

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

            // Main Task Title
            const title = document.createElement('h4');
            title.className = 'mb-0 text-dark';
            title.textContent = task.title;
            if (task.completed) title.classList.add('completed-text');

            // Form area for the Main Task row
            const mainActionArea = document.createElement('div');
            mainActionArea.className = 'd-flex align-items-center';
            mainActionArea.style.gap = '10px';

            // Main Task "Edit" Button (Yellow/Warning)
            const editMainBtn = document.createElement('button');
            editMainBtn.className = 'btn btn-warning btn-sm text-dark';
            editMainBtn.textContent = 'Edit';
            editMainBtn.onclick = () => {
                const newTitle = prompt("Edit Main Task:", task.title);
                if (newTitle !== null && newTitle.trim() !== '') {
                    tasks[index].title = newTitle.trim();
                    updateApp();
                }
            };

            // Main Task "Delete" Button
            const deleteMainBtn = document.createElement('button');
            deleteMainBtn.className = 'btn btn-danger btn-sm';
            deleteMainBtn.textContent = 'Delete Task';
            deleteMainBtn.onclick = () => {
                tasks.splice(index, 1); // Remove the whole task
                updateApp();
            };

            // Subtask Input and '+' Button
            const subtaskForm = document.createElement('div');
            subtaskForm.className = 'subtask-form';

            const subInput = document.createElement('input');
            subInput.type = 'text';
            subInput.className = 'form-control form-control-sm';
            subInput.placeholder = 'Add subcategory...';

            const subBtn = document.createElement('button');
            subBtn.className = 'btn btn-success btn-sm font-weight-bold';
            subBtn.textContent = '+';
            
            subBtn.onclick = () => {
                const subText = subInput.value.trim();
                if (subText) {
                    // Push a new subtask object
                    tasks[index].subtasks.push({ title: subText, completed: false });
                    updateApp();
                }
            };

            // Assemble the Main Task Header
            subtaskForm.appendChild(subInput);
            subtaskForm.appendChild(subBtn);
            mainActionArea.appendChild(subtaskForm);
            mainActionArea.appendChild(editMainBtn); // Added Edit Main Button
            mainActionArea.appendChild(deleteMainBtn); 
            
            taskHeader.appendChild(title);
            taskHeader.appendChild(mainActionArea);
            li.appendChild(taskHeader);
            taskList.appendChild(li);

            // 2. Draw the Subcategories below the Main Task
            if (task.subtasks.length > 0) {
                task.subtasks.forEach((subtask, subIndex) => {
                    const subLi = document.createElement('li');
                    subLi.className = 'list-group-item sub-task d-flex justify-content-between align-items-center';
                    
                    // Subtask Text
                    const textSpan = document.createElement('span');
                    textSpan.innerHTML = `<span class="mr-2 text-muted">&#x21B3;</span> ${subtask.title}`;
                    if (subtask.completed) textSpan.classList.add('completed-text');

                    // Subtask Buttons Area
                    const subBtnGroup = document.createElement('div');
                    subBtnGroup.style.display = 'flex';
                    subBtnGroup.style.gap = '5px';

                    // Subtask "Completed" Button (Green)
                    const compSubBtn = document.createElement('button');
                    compSubBtn.className = 'btn btn-success btn-sm';
                    compSubBtn.textContent = subtask.completed ? 'Undo' : 'Completed';
                    compSubBtn.onclick = () => {
                        tasks[index].subtasks[subIndex].completed = !tasks[index].subtasks[subIndex].completed;
                        updateApp();
                    };

                    // Subtask "Edit" Button (Yellow/Warning)
                    const editSubBtn = document.createElement('button');
                    editSubBtn.className = 'btn btn-warning btn-sm text-dark';
                    editSubBtn.textContent = 'Edit';
                    editSubBtn.onclick = () => {
                        const newTitle = prompt("Edit subcategory:", subtask.title);
                        if (newTitle !== null && newTitle.trim() !== '') {
                            tasks[index].subtasks[subIndex].title = newTitle.trim();
                            updateApp();
                        }
                    };

                    // Subtask "Delete" Button (Red)
                    const delSubBtn = document.createElement('button');
                    delSubBtn.className = 'btn btn-danger btn-sm';
                    delSubBtn.textContent = 'Delete';
                    delSubBtn.onclick = () => {
                        tasks[index].subtasks.splice(subIndex, 1);
                        updateApp();
                    };

                    subBtnGroup.appendChild(compSubBtn);
                    subBtnGroup.appendChild(editSubBtn); // Inserted exactly between Completed and Delete
                    subBtnGroup.appendChild(delSubBtn);

                    subLi.appendChild(textSpan);
                    subLi.appendChild(subBtnGroup);
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
            tasks.push({ title: title, completed: false, subtasks: [] });
            taskInput.value = '';
            updateApp();
        }
    });

    // Let the user hit "Enter" on their keyboard to add a main task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTaskBtn.click();
    });

    // Run this once when the page loads
    renderTasks();
});
