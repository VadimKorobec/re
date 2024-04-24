import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./features/Filters/filtersSlice";
import { todoReducer } from "./features/Todos/todosSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

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

const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persitedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persitedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
