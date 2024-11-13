import { Button, Input } from "@mui/joy";
import { FC, FormEvent, useState } from "react";

export interface IAddNewItemFormProps {
  onCreate?: (content: string) => void;
}

export const AddNewItemForm: FC<IAddNewItemFormProps> = ({ onCreate }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      return;
    }

    onCreate?.(value);
    setValue("");
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Input
        size="lg"
        placeholder="Купить печеньки, выпить кофе..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        endDecorator={
          <Button type="submit" variant="solid" color="primary" disabled={value.trim().length === 0}>
            Добавить
          </Button>
        }
      />
    </form>
  );
};
