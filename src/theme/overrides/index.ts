import { MuiTablePagination } from "./MuiTablePagination";
import { MuiIconButton } from "./MuiIconButton";
import { Theme } from "@mui/material/styles";
import { MuiButton } from "./MuiButton";

export const overrides = (theme: Theme) => ({
  ...MuiButton(theme),
  ...MuiIconButton(theme),
  ...MuiTablePagination(theme),
});
