// This module represents fake API functions to retrieve and save data.
// In this case, localStorage is used as a persistent storage

import { SERVER_FETCH_DELAY } from "../constants/application";
import { TodoListItem } from "../models/todo-list-item";
import { TodoListItemId } from "../types";
import { getNextId } from "../utils/misc";
import { AbstractApiHandler } from "./abstract-api-handler";

const ITEMS_KEY = "items";

export class TodoListApiHandler extends AbstractApiHandler<TodoListItem, TodoListItemId> {
  public findAll = async (): Promise<TodoListItem[]> => {
    return await new Promise(resolve => {
      const data = this.readFromLocalStorage();
      setTimeout(() => resolve(data), SERVER_FETCH_DELAY);
    });
  }

  public async save(entity: TodoListItem): Promise<TodoListItem> {
    const items = this.readFromLocalStorage();

    const currentIndex = items.findIndex(i => i.id === entity.id);
    let item = entity;

    if (currentIndex < 0 || entity.id === 0) {
      item = { ...entity, id: getNextId(items) };
      items.push(item);
    } else {
      items.splice(currentIndex, 1, item);
    }

    this.saveToLocalStorage(items);
    return item;
  }

  public async delete(id: number): Promise<void> {
    const items = this.readFromLocalStorage();

    const currentIndex = items.findIndex(i => i.id === id);

    if (currentIndex < 0) {
      throw new Error(`Todo item with id=${id} was not found`);
    }

    items.splice(currentIndex, 1);
    this.saveToLocalStorage(items);
  }

  private readFromLocalStorage(): TodoListItem[] {
    return JSON.parse(localStorage.getItem(ITEMS_KEY) ?? "[]") as TodoListItem[];
  }

  private saveToLocalStorage(items: TodoListItem[]) {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }
}
