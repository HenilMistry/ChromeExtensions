// Use chrome.storage.sync to save and retrieve tasks
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");

// Load tasks from storage on startup
function loadTasks() {
  chrome.storage.sync.get({ tasks: [] }, function (data) {
    // data.tasks is an array of task strings
    data.tasks.forEach(task => addTaskToDOM(task));
  });
}

// Save the complete task list
function saveTasks(tasks) {
  chrome.storage.sync.set({ tasks: tasks });
}

// Add a task to the DOM and update storage
function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    addTaskToDOM(task);
    updateStorage();
    taskInput.value = "";
  }
}

// Append a new list item for a task
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task;
  // Create a delete button for the task
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "×";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    updateStorage();
  };
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Update storage with current list items
function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#todoList li").forEach(li => {
    // Remove the delete button text from the li text content
    const taskText = li.firstChild.textContent.trim();
    if (taskText) {
      tasks.push(taskText);
    }
  });
  saveTasks(tasks);
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Initial load
loadTasks();
