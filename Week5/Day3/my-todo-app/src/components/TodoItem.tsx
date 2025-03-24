import { useState, useRef, useEffect } from "react";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  toggleComplete: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleComplete, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  // Save edits when Enter is pressed or clicking outside
  const handleBlurOrEnter = (e: React.KeyboardEvent | React.FocusEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    if (newText.trim()) {
      updateTodo(todo.id, newText.trim());
    }
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleBlurOrEnter}
          onBlur={handleBlurOrEnter}
        />
      ) : (
        <span className={todo.completed ? "completed" : ""} onClick={() => toggleComplete(todo.id)}>
          {todo.text}
        </span>
      )}

      {/* Wrapped buttons inside a div with class "button-group" */}
      <div className="button-group">
        <button className="action-btn edit" onClick={() => setIsEditing(true)}>
          ✏️ Edit
        </button>
        <button className="action-btn delete" onClick={() => deleteTodo(todo.id)}>
          🗑️ Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
