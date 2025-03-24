import { useState } from "react";

interface Props {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<Props> = ({ onAddTodo }) => {
  const [text, setText] = useState("");

  const handleAddTodo = () => {
    if (!text.trim()) {
      alert("Please enter a task!");
      return;
    }
    onAddTodo(text);
    setText("");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default TodoInput;
