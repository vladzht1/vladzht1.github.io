import { TodoListItemId } from "../types";

export type TodoListItem = {
  id: TodoListItemId;
  title: string;
  isCompleted: boolean;
}
