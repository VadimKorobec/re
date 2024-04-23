import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { NewTodo } from "./NewTodo";
import { removeTodo, toggleTodo } from "./store";

function App() {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <NewTodo />
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />{" "}
          {todo.title}{" "}
          <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </li>
      ))}
    </div>
  );
}

export default App;
