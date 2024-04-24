import { useDispatch } from "react-redux";
import { addTodo } from "./features/Todos/todosSlice";

export const NewTodo = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.title.value) {
      return;
    }
    dispatch(addTodo(form.title.value));

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="new todo" />
      <button type="submit">add todo</button>
    </form>
  );
};
