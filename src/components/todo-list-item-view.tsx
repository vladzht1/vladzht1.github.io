import { DeleteOutline } from "@mui/icons-material";
import { Card, Checkbox, IconButton, Stack } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { FC, useState } from "react";

import { TodoListItem } from "../models/todo-list-item";

const MAX_CHARS_ITEM = 50;

export interface ITodoListItemViewProps {
  onToggle?: (newState: boolean) => void;
  onDelete?: () => void;
}

export const TodoListItemView: FC<ITodoListItemViewProps & TodoListItem> = ({ onDelete, onToggle, ...rest }) => {
  const [showActions, setShowActions] = useState(false);

  const defaultStyles: SxProps = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textWrap: "balance",
    flexGrow: 1,
  };

  return (
    <Card onMouseOver={() => setShowActions(true)} onMouseOut={() => setShowActions(false)}>
      <Stack
        direction="row"
        alignContent="stretch"
        justifyContent="space-between"
        alignItems="center"
        sx={{ maxHeight: "1rem" }}
      >
        <Checkbox
          label={rest.title.length > MAX_CHARS_ITEM ? rest.title.substring(0, MAX_CHARS_ITEM) : rest.title}
          variant="outlined"
          checked={rest.isCompleted}
          onChange={(event) => onToggle?.(event.target.checked)}
          title={rest.title.length > MAX_CHARS_ITEM ? rest.title : ""}
          sx={rest.isCompleted ? { color: "gray", textDecoration: "line-through", ...defaultStyles } : defaultStyles}
        />
        {showActions && (
          <Stack gap={1} direction="row">
            <IconButton color="danger" sx={{ margin: 0 }} onClick={onDelete}>
              <DeleteOutline />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};
