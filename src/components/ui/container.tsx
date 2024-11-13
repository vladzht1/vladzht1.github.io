import { Box } from "@mui/joy";
import { FC, ReactElement } from "react";

export interface IContainerProps {
  children?: ReactElement | ReactElement[];
}

export const Container: FC<IContainerProps> = ({ children }) => {
  return <Box sx={{ maxWidth: 1170, margin: "0 auto", position: "relative" }}>{children}</Box>;
};
