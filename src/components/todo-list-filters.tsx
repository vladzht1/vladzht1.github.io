import { Radio, RadioGroup } from "@mui/joy";
import { FC, useEffect, useState } from "react";

import { TodoListFilter } from "../types";

export interface ITodoListFiltersProps {
  value?: TodoListFilter;
  onChange?: (value: TodoListFilter) => void;
}

export const TodoListFilters: FC<ITodoListFiltersProps> = ({ value = "all", onChange }) => {
  const [filterValue, setFilterValue] = useState<TodoListFilter>(value);

  useEffect(() => {
    onChange?.(filterValue);
  }, [filterValue, onChange]);

  return (
    <RadioGroup
      orientation="horizontal"
      name="justify"
      value={filterValue}
      onChange={(event) => setFilterValue(event.target.value as TodoListFilter)}
      sx={{
        minHeight: 32,
        "--RadioGroup-gap": "4px",
        "--Radio-actionRadius": "8px",
      }}
    >
      {(["all", "active", "completed"] as TodoListFilter[]).map((item) => (
        <Radio
          key={item}
          color="neutral"
          value={item}
          disableIcon
          label={mapToRus(item)}
          variant="plain"
          sx={{ px: 3, alignItems: "center" }}
          slotProps={{
            action: ({ checked }) => ({
              sx: {
                ...(checked && {
                  bgcolor: "background.surface",
                  boxShadow: "sm",
                  "&:hover": {
                    bgcolor: "background.surface",
                  },
                }),
              },
            }),
          }}
        />
      ))}
    </RadioGroup>
  );
};

const mapToRus = (filter: TodoListFilter): string => {
  switch (filter) {
    case "active":
      return "Активные";
    case "completed":
      return "Завершённые";
    default:
      return "Все";
  }
};
