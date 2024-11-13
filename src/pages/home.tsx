import { Typography } from "@mui/joy";
import { FC } from "react";

import { TodoListBlock } from "../components/todo-list-block";
import { Container } from "../components/ui/container";
import { useTodoList } from "../hooks/use-todo-list";

export const HomePage: FC = () => {
  const { todoList, addItem, handleToggleCompleted, deleteItems, isFetching } = useTodoList();

  return (
    <main>
      <Container>
        <Typography level="h2" textAlign="center" sx={{ marginBottom: "1rem" }}>
          Задачи
        </Typography>
        <TodoListBlock
          items={todoList}
          isFetching={isFetching}
          onInsertNew={addItem}
          onToggleState={handleToggleCompleted}
          onDeleteItem={deleteItems}
        />
      </Container>
    </main>
  );
};
