import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./filtersSlice";

export const FilterTodo = () => {
  const activeFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleFilter = (value) => {
    dispatch(setFilter(value));
  };

  return (
    <div>
      <button
        onClick={() => handleFilter("all")}
        style={{ backgroundColor: activeFilter === "all" ? "red" : "white" }}
      >
        all
      </button>
      <button
        onClick={() => handleFilter("active")}
        style={{
          backgroundColor: activeFilter === "active" ? "yellow" : "white",
        }}
      >
        active
      </button>
      <button
        onClick={() => handleFilter("completed")}
        style={{
          backgroundColor: activeFilter === "completed" ? "green" : "white",
        }}
      >
        completed
      </button>
    </div>
  );
};
