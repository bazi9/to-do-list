from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory data storage for simplicity
tasks = {}

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task_name = request.form['task'].strip()
    # If category is empty, default to 'Uncategorized'
    category = request.form.get('category', '').strip() or 'Uncategorized'
    
    if task_name:
        if category not in tasks:
            tasks[category] = [task_name]
        else:
            tasks[category].append(task_name)
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
