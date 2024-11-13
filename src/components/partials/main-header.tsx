import { Stack, Typography } from "@mui/joy";
import { FC } from "react";

import { Container } from "../ui/container";

export const MainHeader: FC = () => {
  return (
    <header style={{ marginBottom: "1rem" }}>
      <Container>
        <Stack>
          <Typography level="h2" sx={{ lineHeight: 1 }}>
            TodoList
          </Typography>
          <Typography fontSize="0.8rem">by @vladzht1</Typography>
        </Stack>
      </Container>
    </header>
  );
};
