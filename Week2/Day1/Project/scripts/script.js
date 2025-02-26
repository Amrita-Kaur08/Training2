// DOM elements
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage when the page loads
window.addEventListener("load", loadTodos);

// Adding event listener to the Add button
addButton.addEventListener("click", () => {
  addTodo();
});

// Adding event listener for Enter key
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Function to add a new to-do
function addTodo() {
  const todoText = todoInput.value.trim(); // Get input value and remove whitespace

  // Check if input is empty
  if (todoText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create a new task object
  const todo = { text: todoText, status: false };

  // Save the task in localStorage
  saveTodoToLocalStorage(todo);

  // Add the task to the DOM
  addTodoToDOM(todo);

  // Clear the input field
  todoInput.value = "";
}

// Function to add a task to the DOM
function addTodoToDOM(todo) {
  // Create a new list item for the to-do
  const todoItem = document.createElement("li");
  todoItem.className = "todo-item";

  // Create the text span
  const textSpan = document.createElement("span");
  textSpan.className = "todo-text";
  textSpan.textContent = todo.text;

  // Add completed class if the task is marked as completed
  if (todo.completed) {
    textSpan.classList.add("completed");
  }

  // Toggle completion on click
  textSpan.addEventListener("click", () => {
    textSpan.classList.toggle("completed");
    updateTodoInLocalStorage(todo.text, { completed: textSpan.classList.contains("completed") });
  });

  // Create the Update button
  const updateBtn = document.createElement("button");
  updateBtn.className = "action-btn update";
  updateBtn.innerHTML = "&#9998;"; // Pencil emoji
  updateBtn.addEventListener("click", () => {
    // Allow the user to edit the text directly
    textSpan.contentEditable = "true";
    textSpan.focus();

    // Save changes when the user presses Enter
    textSpan.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent line breaks
        textSpan.contentEditable = "false"; // Lock editing after Enter
        updateTodoInLocalStorage(todo.text, { text: textSpan.textContent });
        todo.text = textSpan.textContent; // Update the todo object in memory
      }
    });
  });

  // Create the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "action-btn delete";
  deleteBtn.innerHTML = "&#x1F5D1;"; // Trash emoji
  deleteBtn.addEventListener("click", () => {
    removeTodoFromLocalStorage(todo.text);
    todoList.removeChild(todoItem); // Remove task from the list
  });

  // Append the text span, update button, and delete button to the list item
  todoItem.appendChild(textSpan);
  todoItem.appendChild(updateBtn);
  todoItem.appendChild(deleteBtn);

  // Add the list item to the to-do list
  todoList.appendChild(todoItem);
}

// Function to load todos from localStorage and display them
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => addTodoToDOM(todo));
}

// Function to save a todo to localStorage
function saveTodoToLocalStorage(todo) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to update a todo in localStorage
function updateTodoInLocalStorage(originalText, updates) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoIndex = todos.findIndex((t) => t.text === originalText);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...updates };
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// Function to remove a todo from localStorage
function removeTodoFromLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
