import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../api/_global";
import { TodoListItem } from "../models/todo-list-item";
import { TodoListItemId } from "../types";

export const todoListSlice = createSlice({
  name: "todo-list",

  initialState: {
    items: [] as TodoListItem[],
    isFetching: false
  },

  reducers: {
    setTodoItems: (state, action: PayloadAction<TodoListItem[]>) => {
      state.items.splice(0, state.items.length, ...action.payload);
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodoItems.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchTodoItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isFetching = false;
    });

    builder.addCase(addTodoItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(updateTodoItem.fulfilled, (state, action) => {
      const currentItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      state.items.splice(currentItemIndex, 1, action.payload);
    });

    builder.addCase(removeTodoItem.fulfilled, (state, action) => {
      const currentItemIndex = state.items.findIndex(item => item.id === action.payload);
      state.items.splice(currentItemIndex, 1);
    });
  }
});

const fetchTodoItems = createAsyncThunk("fetch-todo-items", async () => {
  return await api.todoListApiHandler().findAll();
});

const addTodoItem = createAsyncThunk("add-todo-item", async (item: TodoListItem) => {
  return await api.todoListApiHandler().save(item);
});

const updateTodoItem = createAsyncThunk("update-todo-item", async (item: TodoListItem) => {
  return await api.todoListApiHandler().save(item);
});

const removeTodoItem = createAsyncThunk("delete-todo-item", async ({ id }: { id: TodoListItemId }) => {
  await api.todoListApiHandler().delete(id);
  return id;
});

export const { setTodoItems } = todoListSlice.actions;
export const { reducer } = todoListSlice;
export { addTodoItem, fetchTodoItems, removeTodoItem, updateTodoItem };
