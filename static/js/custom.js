
// This file is successfully linked to your HTML!
// You can use this later to add features like a confirmation popup before deleting a task.

document.addEventListener('DOMContentLoaded', function() {
    console.log("Custom JavaScript loaded successfully.");
    
    // Example: Automatically focus on the task input field when the page loads
    const taskInput = document.getElementById('task');
    if (taskInput) {
        taskInput.focus();
    }
});
