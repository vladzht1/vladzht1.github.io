import React from "react";

import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { TodoListBlock } from "../../src/components/todo-list-block";
import { TodoListItem } from "../../src/models/todo-list-item";
import { TodoListItemId } from "../../src/types";
import { MockTodoItemsStoreStore } from "../mock/store";

const ADD_ITEM_BUTTON_TEXT = "Добавить";
const INPUT_PLACEHOLDER_TEXT = "Купить печеньки, выпить кофе...";

const titles = {
  title1: "title1",
  title2: "title2",
  title3: "title3",
};

const items: TodoListItem[] = [
  { id: 1, title: titles.title1, isCompleted: false },
  { id: 2, title: titles.title2, isCompleted: true },
  { id: 3, title: titles.title3, isCompleted: false },
];

const getInputElement = () => screen.getByPlaceholderText(INPUT_PLACEHOLDER_TEXT) as HTMLInputElement;

const store = new MockTodoItemsStoreStore();

afterEach(() => {
  cleanup();
  store.clear();
});

describe("render todo block correctly", () => {
  test("should render todo-list block correctly", () => {
    render(<TodoListBlock items={items} calculateActiveTasksAmount={() => 1} />);

    expect(screen.getByText(titles.title1)).toBeInTheDocument();
    expect(screen.getByText(titles.title2)).toBeInTheDocument();
    expect(screen.getByText(titles.title3)).toBeInTheDocument();
  });

  test("should display active tasks amount", () => {
    let view = render(<TodoListBlock items={[]} calculateActiveTasksAmount={() => 0} />);

    expect(screen.getByText("0 активных задач")).toBeInTheDocument();
    view.unmount();

    view = render(<TodoListBlock items={[]} calculateActiveTasksAmount={() => 1} />);
    expect(screen.getByText("1 активная задача")).toBeInTheDocument();

    view.unmount();

    view = render(<TodoListBlock items={[]} calculateActiveTasksAmount={() => 2} />);
    expect(screen.getByText("2 активные задачи")).toBeInTheDocument();

    view.unmount();

    view = render(<TodoListBlock items={[]} calculateActiveTasksAmount={() => 5} />);
    expect(screen.getByText("5 активных задач")).toBeInTheDocument();
  });

  test("should display `isFetching` state correctly", () => {
    render(<TodoListBlock items={items} isFetching={true} />);

    // Exactly 3 skeleton items
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  test("should insert new item via form", async () => {
    const taskTitle = "Task Title";

    const addCallback = jest.fn(async (item: Omit<TodoListItem, "id">) => {
      await store.save({ id: 0, ...item });
    });

    const { rerender } = render(<TodoListBlock items={await store.findAll()} onInsertNew={addCallback} />);
    expect(getInputElement()).toBeInTheDocument();

    fireEvent.change(getInputElement(), { target: { value: taskTitle } });
    expect(getInputElement().defaultValue).toBe(taskTitle);

    fireEvent.click(screen.getByText(ADD_ITEM_BUTTON_TEXT));

    rerender(<TodoListBlock items={await store.findAll()} onInsertNew={addCallback} />);

    // Callback called
    expect(addCallback).toHaveBeenCalledWith({ title: taskTitle, isCompleted: false } as Omit<TodoListItem, "id">);

    // Element rendered to the page
    expect(screen.getByText(taskTitle)).toBeInTheDocument();

    // Input value was dropped to empty string
    expect(getInputElement().defaultValue).toBe("");
  });

  test("should update item checked state on click", async () => {
    const onToggleCallback = jest.fn(async (id: TodoListItemId, state: boolean) => {
      const item = await store.findById(id);

      if (!item) {
        throw new Error(`Item with id=${id} was not found`);
      }

      await store.save({ ...item, isCompleted: state });
    });

    const title = "title";

    await store.save({ id: 1, title, isCompleted: false });
    const { rerender } = render(<TodoListBlock items={await store.findAll()} onToggleState={onToggleCallback} />);

    expect(screen.getByText(title)).toBeInTheDocument();

    fireEvent.click(screen.getByText(title));
    rerender(<TodoListBlock items={await store.findAll()} onToggleState={onToggleCallback} />);

    expect(onToggleCallback).toHaveBeenCalledTimes(1);
    expect((await store.findById(1))!.isCompleted).toBe(true);
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
  });

  test("should delete item", () => {});
});
