import { AbstractApiHandler } from "../../src/api/abstract-api-handler";
import { TodoListItem } from "../../src/models/todo-list-item";
import { TodoListItemId } from "../../src/types";
import { getNextId } from "../../src/utils/misc";

/** Mock storage implementation for tasting */
export class MockTodoItemsStoreStore extends AbstractApiHandler<TodoListItem, number> {
  private data: TodoListItem[];

  public constructor(data?: TodoListItem[]) {
    super();
    this.data = data ?? [];
  }

  public async findAll(): Promise<TodoListItem[]> {
    return this.data;
  }

  public async findById(id: TodoListItemId): Promise<TodoListItem | null> {
    return this.data.find(item => item.id === id) ?? null;
  }

  public async save(entity: TodoListItem): Promise<TodoListItem> {
    const currentIndex = this.data.findIndex(i => i.id === entity.id);
    let item = entity;

    if (currentIndex < 0 || entity.id === 0) {
      item = { ...entity, id: getNextId(this.data) };
      this.data.push(item);
    } else {
      this.data.splice(currentIndex, 1, item);
    }

    return item;
  }

  public async delete(id: number): Promise<void> {
    this.data.splice(this.data.findIndex(i => i.id === id), 1);
  }

  public clear(): void {
    this.data.splice(0, this.data.length);
  }
}
