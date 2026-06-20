from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Dictionary to hold Main Tasks as keys, and lists of Subcategories as values
tasks = {}

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task_name = request.form.get('task', '').strip()
    
    # Create the main task if it doesn't exist yet
    if task_name and task_name not in tasks:
        tasks[task_name] = [] 
    
    return redirect(url_for('index'))

@app.route('/add_subtask', methods=['POST'])
def add_subtask():
    main_task = request.form.get('main_task')
    subtask_name = request.form.get('subtask', '').strip()
    
    # Add the subcategory to the specific main task
    if main_task in tasks and subtask_name:
        tasks[main_task].append(subtask_name)
        
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
