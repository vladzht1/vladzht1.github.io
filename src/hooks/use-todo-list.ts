import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import {
  addTodoItem,
  fetchTodoItems,
  removeTodoItem,
  updateTodoItem
} from "../store/todo-list-slice";

import { TodoListItem } from "../models/todo-list-item";
import { RootState } from "../store/store";
import { TodoListItemId } from "../types";
import { getNextId } from "../utils/misc";
import { useTypedDispatch } from "./use-typed-dispatch";

export const useTodoList = () => {
  const isFirstLoad = useRef(true);

  const { items, isFetching } = useSelector((state: RootState) => state.todoList);
  const dispatch = useTypedDispatch();

  const addItem = (newItem: Omit<TodoListItem, "id">) => {
    dispatch(addTodoItem({ ...newItem, id: getNextId(items) }));
  };

  const handleToggleCompleted = (id: TodoListItemId, state: boolean) => {
    const item = items.find(i => i.id === id);

    if (!item) {
      return;
    }

    dispatch(updateTodoItem({ ...item, isCompleted: state }));
  };

  const deleteItems = (id: TodoListItemId) => {
    dispatch(removeTodoItem({ id }));
  }

  useEffect(() => {
    if (!isFirstLoad.current) {
      return;
    }

    isFirstLoad.current = false;

    dispatch(fetchTodoItems());
  }, [dispatch]);

  return { todoList: items, addItem, handleToggleCompleted, deleteItems, isFetching };
}
