import { createSlice, nanoid } from "@reduxjs/toolkit";
import { resetToDefault } from "../Reset/resetActions";

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
  extraReducers: (builder) => {
    builder.addCase(resetToDefault, () => {
      return [];
    });
  },
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

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
