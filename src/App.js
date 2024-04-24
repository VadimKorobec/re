import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { NewTodo } from "./NewTodo";
import { removeTodo, selectVisibleTodos, toggleTodo } from "./store";
import { FilterTodo } from "./FilterTodo";

function App() {
  const activeFilter = useSelector((state) => state.filter);
  const todos = useSelector((state) => selectVisibleTodos(state, activeFilter));
  const dispatch = useDispatch();

  return (
    <div className="App">
      <NewTodo />
      <FilterTodo />
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
          <p>{todo.title}</p>
          <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </li>
      ))}
    </div>
  );
}

export default App;
