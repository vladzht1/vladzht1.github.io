import { configureStore } from "@reduxjs/toolkit";

import { reducer as todoListReducer } from "./todo-list-slice";

export const store = configureStore({
  reducer: {
    todoList: todoListReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
