import { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import { Todo } from "../types";
import "./styles.css";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to load todos from localStorage", error);
      return [];
    }
  });

  // Save todos to localStorage whenever the list updates
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  // Toggle completion
  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Update existing todo
  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              addTodo(e.currentTarget.value.trim());
              e.currentTarget.value = "";
            }
          }}
        />
        <button onClick={() => {
          const input = document.querySelector("input");
          if (input?.value.trim()) {
            addTodo(input.value.trim());
            input.value = "";
          }
        }}>Add</button>
      </div>
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        updateTodo={updateTodo} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
};

export default TodoApp;
