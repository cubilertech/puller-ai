import { PaletteMode } from "@mui/material";

const brand = {
  950: "#2C1C5F",
  900: "#42307D",
  800: "#53389E",
  700: "#6941C6",
  600: "#7F56D9",
  500: "#9E77ED",
  400: "#B692F6",
  300: "#D6BBFB",
  200: "#E9D7EF",
  100: "#F4EBFF",
  50: "#F9F5FF",
  25: "#FCFAFF",
};

const error = {
  950: "#55160C",
  900: "#7A271A",
  800: "#912018",
  700: "#842318",
  600: "#D92D20",
  500: "#F04438",
  400: "#F97066",
  300: "#FDA29B",
  200: "#FECDCA",
  100: "#FEE4E2",
  50: "#FEF3F2",
  25: "#FFFBEA",
};

const warning = {
  950: "#4E1D09",
  900: "#7A2E0E",
  800: "#93370D",
  700: "#854708",
  600: "#DC6803",
  500: "#F79009",
  400: "#FDB022",
  300: "#FEC84B",
  200: "#FEDF89",
  100: "#FEF0C7",
  50: "#fffaeb",
  25: "#FFFCF5",
};

const success = {
  950: "#053321",
  900: "#074D31",
  800: "#085D3A",
  700: "#067647",
  600: "#079455",
  500: "#17B26A",
  400: "#47CD89",
  300: "#75E0A7",
  200: "#ABEFC6",
  100: "#DCFAE6",
  50: "#ECFDF3",
  25: "#F6FEF9",
};
const gray = {
  950: "#0C111D",
  900: "#101828",
  800: "#182230",
  700: "#344054",
  600: "#475467",
  500: "#667085",
  400: "#98A2B3",
  300: "#D0D5DD",
  200: "#EAECF0",
  100: "#F2F4F7",
  50: "#F9FAFB",
  25: "#FCFCFD",
};

const base = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "#FFFFFF 0%",
};

export const palette = {
  mode: "dark" as PaletteMode,
  brand,
  base,
  gray,
  error,
  warning,
  success,
};
