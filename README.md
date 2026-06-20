# 📝 To-Do List App (JavaScript Edition)

A lightweight, fully functional, and serverless To-Do List web application built with purely static files.

This version relies entirely on the browser's built-in **Local Storage** to save your tasks. This means you do not need a backend database or server to run it, and your tasks will automatically be saved and remembered even if you close or refresh the page!

## ✨ Features

* **Main Tasks & Subcategories:** Organize your workload by breaking down large tasks into smaller, manageable sub-tasks.
* **Full Data Control:** Create, Read, Update (Edit), and Delete both main tasks and subcategories at any time.
* **Completion Tracking:** Easily mark tasks or subtasks as "Completed" (featuring a visual strikethrough) and undo them if needed.
* **Persistent Storage:** Uses standard browser `localStorage` to securely remember your data between sessions.
* **Responsive Design:** Clean, modern interface powered by Bootstrap.

## 🚀 How to Run (Local)

Because this is a purely static site, running it locally is incredibly simple:

1. Clone or download this repository to your computer.
2. Ensure all three core files (`index.html`, `style.css`, and `script.js`) are saved in the exact same folder.
3. Double-click `index.html` to open it directly in any modern web browser. That is it!

## 🌐 How to Host (Online for Free)

This project is perfectly suited for free static web hosting, such as **GitHub Pages**:

1. Upload the files to your GitHub repository.
2. Go to your repository **Settings** > **Pages**.
3. Under the "Build and deployment" section, set the source to deploy from your `main` branch.
4. Save your changes. Wait a few minutes, and GitHub will provide you with a live URL to share with others!

## 🛠️ Technologies Used

* **HTML5:** Core page structure.
* **CSS3:** Custom styling, formatting, and animations.
* **JavaScript (Vanilla):** DOM manipulation, event handling, and local storage data logic.
* **Bootstrap 4:** External CSS framework for rapid UI component styling and responsive layouts.

## 📂 Folder Structure

Ensure your repository is flat (no sub-folders) and looks exactly like this:

```text
to-do-list/
├── index.html
├── style.css
├── script.js
└── README.md
