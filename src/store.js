import { createStore, nanoid } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "@redux-devtools/extension";

// export const addTodo = (title) => {
//   return {
//     type: "ADD_TODO",
//     title,
//   };
// };

export const addTodo = createAction("todos/ADD_TODO", (title) => ({
  payload: {
    title,
    id: nanoid(),
    completed: false,
  },
}));

// export const removeTodo = (id) => ({
//   type: "REMOVE_TODO",
//   id,
// });

export const removeTodo = createAction("todos/REMOVE_TODO");

// export const toggleTodo = (id) => ({
//   type: "TOGGLE_TODO",
//   id,
// });

export const toggleTodo = createAction("todos/TOGGLE_TODO");

const todos = (state = [], action) => {
  switch (action.type) {
    case addTodo.toString():
      return [...state, action.payload];
    case removeTodo.toString():
      return state.filter((todo) => todo.id !== action.payload);
    case toggleTodo.toString():
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

const enhancer = devToolsEnhancer();
export const store = createStore(todos, enhancer);
