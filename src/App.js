import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { NewTodo } from "./NewTodo";

import { FilterTodo } from "./features/Filters/FilterTodo";
import { ResetApp } from "./features/Reset/ResetApp";
import {
  removeTodo,
  selectVisibleTodos,
  toggleTodo,
} from "./features/Todos/todosSlice";

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
          {todo.title}
          <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </li>
      ))}
      <ResetApp />
    </div>
  );
}

export default App;
