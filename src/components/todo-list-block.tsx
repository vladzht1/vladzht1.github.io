import { DeleteForever, DoneAll } from "@mui/icons-material";
import { ButtonGroup, Card, Grid, IconButton, Skeleton, Stack, Typography } from "@mui/joy";
import { FC, useCallback, useState } from "react";

import { TodoListItem } from "../models/todo-list-item";
import { TodoListFilter, TodoListItemId } from "../types";
import { toSorted } from "../utils/compat";
import { filterTodoItems } from "../utils/filter";
import { chooseNumeralEnding } from "../utils/misc";
import { AddNewItemForm } from "./todo-list-add-new-item-form";
import { TodoListFilters } from "./todo-list-filters";
import { TodoListItemView } from "./todo-list-item-view";

export interface ITodoListBlockProps {
  /** Initial items list */
  items: TodoListItem[];

  /** If set to true, the list skeleton element will be rendered and the actual list won't */
  isFetching?: boolean;

  // This property is required to be able to provide custom calculation function
  calculateActiveTasksAmount?: (items: TodoListItem[]) => number;

  /** Callback function on item insertion */
  onInsertNew?: (item: Omit<TodoListItem, "id">) => void;

  /** Callback function on item complete-state toggle */
  onToggleState?: (id: TodoListItemId, state: boolean) => void;

  /** Callback function on item deletion */
  onDeleteItem?: (id: TodoListItemId) => void;
}

export const TodoListBlock: FC<ITodoListBlockProps> = ({
  items,
  isFetching = false,
  calculateActiveTasksAmount = (items: TodoListItem[]) => items.filter((item) => !item.isCompleted).length,
  onInsertNew,
  onToggleState,
  onDeleteItem,
}) => {
  const [todoList, setTodoList] = useState(items);

  const onFilterChange = useCallback(
    (filter: TodoListFilter) => {
      setTodoList(filterTodoItems(items, filter));
    },
    [items]
  );

  const handleInsert = (content: string) => {
    onInsertNew?.({ title: content, isCompleted: false });
  };

  const clearCompleted = () => {
    for (const item of todoList) {
      if (item.isCompleted) {
        onDeleteItem?.(item.id);
      }
    }
  };

  const clearAll = () => {
    for (const item of todoList) {
      onDeleteItem?.(item.id);
    }
  };

  const activeTasksAmount = useCallback(() => {
    return calculateActiveTasksAmount(items);
  }, [calculateActiveTasksAmount, items]);

  return (
    <Stack gap="1rem">
      {isFetching ? (
        <TodoListSkeleton />
      ) : (
        <>
          <Card
            sx={{
              py: 1,
            }}
          >
            <Grid container sx={{ flexGrow: 1, width: "100%", justifyContent: "space-between", alignItems: "center" }}>
              <Grid>
                <Typography>
                  {activeTasksAmount()} {chooseNumeralEnding(activeTasksAmount(), "активная", "активные", "активных")}{" "}
                  {chooseNumeralEnding(activeTasksAmount(), "задача", "задачи", "задач")}
                </Typography>
              </Grid>

              <Grid>
                <TodoListFilters onChange={onFilterChange} />
              </Grid>

              <Grid>
                <ButtonGroup sx={{ "--ButtonGroup-separatorColor": "none !important" }}>
                  <IconButton color="success" variant="plain" onClick={clearCompleted} title="Очистить завершённые">
                    <DoneAll />
                  </IconButton>
                  <IconButton color="danger" variant="plain" onClick={clearAll} title="Очистить все">
                    <DeleteForever />
                  </IconButton>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Card>

          <AddNewItemForm onCreate={handleInsert} />

          <Stack gap="1rem" sx={{ maxHeight: "calc(100vh - 300px)", overflowX: "scroll" }}>
            {todoList.length > 0 ? (
              toSorted(todoList, (a, b) => b.id - a.id).map((item) => (
                <TodoListItemView
                  {...item}
                  key={item.id}
                  onToggle={(state) => onToggleState?.(item.id, state)}
                  onDelete={() => onDeleteItem?.(item.id)}
                />
              ))
            ) : (
              <Typography textAlign="center">Список задач пуст</Typography>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

const TodoListSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} sx={{ width: "100%", height: 50, position: "relative" }} role="listitem" />
    ))}
  </>
);
