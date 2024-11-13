import { TodoListItem } from "../models/todo-list-item";
import { TodoListFilter } from "../types";

export const filterTodoItems = (items: TodoListItem[], filter: TodoListFilter): TodoListItem[] => {
  switch (filter) {
    case "all":
      return items;
    case "active":
      return items.filter((i) => !i.isCompleted);
    case "completed":
      return items.filter((i) => i.isCompleted);
  }
}
