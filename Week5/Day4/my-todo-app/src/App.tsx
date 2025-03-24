import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import { Todo } from "./types";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // 🔥 Save to localStorage when `todos` changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

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
      <TodoList todos={todos} toggleComplete={toggleComplete} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
