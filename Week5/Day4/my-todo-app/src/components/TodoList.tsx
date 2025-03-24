import { Todo } from "../types";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleComplete, updateTodo, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
