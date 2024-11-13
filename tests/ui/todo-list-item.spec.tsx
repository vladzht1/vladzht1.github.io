import React from "react";

import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { TodoListItemView } from "../../src/components/todo-list-item-view";
import { TodoListItem } from "../../src/models/todo-list-item";

const item: TodoListItem = { id: 1, title: "Title", isCompleted: false };

afterEach(cleanup);

describe("render todo-list item correctly", () => {
  test("should render todo-list item correctly", async () => {
    render(<TodoListItemView {...item} />);

    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("should call state change callback on click", async () => {
    let isCompleted = false;

    const toggleCallback = jest.fn(() => {
      isCompleted = !isCompleted;
    });

    const { rerender } = render(
      <TodoListItemView id={1} title="title" isCompleted={isCompleted} onToggle={toggleCallback} />
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(toggleCallback).toHaveBeenCalledWith(true);

    rerender(<TodoListItemView id={1} title="title" isCompleted={isCompleted} onToggle={toggleCallback} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(toggleCallback).toHaveBeenCalledWith(false);
  });

  test("should call delete callback on delete button click", () => {
    const deleteCallback = jest.fn();

    render(<TodoListItemView id={1} title={item.title} isCompleted={false} onDelete={deleteCallback} />);

    // Hover to make the delete button appear
    fireEvent.mouseOver(screen.getByText(item.title));
    fireEvent.click(screen.getByRole("button"));

    expect(deleteCallback).toHaveBeenCalledTimes(1);
  });
});
