import { TodoListItem } from "../models/todo-list-item";
import { TodoListItemId } from "../types";
import { AbstractApiHandler } from "./abstract-api-handler";
import { TodoListApiHandler } from "./todo-list-api-handler";

let apiHandler: AbstractApiHandler<TodoListItem, TodoListItemId> | null = null;

export const api = {
  todoListApiHandler: (): AbstractApiHandler<TodoListItem, TodoListItemId> => {
    if (!apiHandler) {
      apiHandler = new TodoListApiHandler();
    }

    return apiHandler;
  },

  clearApiHandler: (): void => {
    apiHandler = null;
  }
}
