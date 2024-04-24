import { nanoid, createSlice, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// export const addTodo = createAction("todos/ADD_TODO", (title) => ({
//   payload: {
//     title,
//     id: nanoid(),
//     completed: false,
//   },
// }));

// export const removeTodo = createAction("todos/REMOVE_TODO");

// export const toggleTodo = createAction("todos/TOGGLE_TODO");

// const todos = createReducer([], (builder) => {
//   builder
//     .addCase(addTodo, (state, action) => {
//       return [...state, action.payload];
//     })
//     .addCase(removeTodo, (state, action) => {
//       return state.filter((todo) => todo.id !== action.payload);
//     })
//     .addCase(toggleTodo, (state, action) => {
//       return state.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//     });
// });

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        return [...state, action.payload];
      },
      prepare: (title) => ({
        payload: {
          id: nanoid(),
          title,
          completed: false,
        },
      }),
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

const filterSlice = createSlice({
  name: "filter",
  initialState: "all",
  reducers: {
    setFilter: (_, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export const { setFilter } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    filter: filterSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const selectVisibleTodos = (state, filter) => {
  switch (filter) {
    case "all":
      return state.todos;
    case "active":
      return state.todos.filter((todo) => !todo.completed);
    case "completed":
      return state.todos.filter((todo) => todo.completed);
    default:
      return state;
  }
};
