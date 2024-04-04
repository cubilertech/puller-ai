import { PaletteMode } from "@mui/material";

const brand = {
  900: "#2C1C5F",
  800: "#42307D",
  700: "#53389E",
  600: "#6941C6",
  500: "#7F56D9",
  400: "#9E77ED",
  300: "#B692F6",
  200: "#D6BBFB",
  100: "#E9D7EF",
  50: "#F4EBFF",
};

const error = {
  900: "#55160C",
  800: "#7A271A",
  700: "#912018",
  600: "#842318",
  500: "#D92D20",
  400: "#F04438",
  300: "#F97066",
  200: "#FDA29B",
  100: "#FECDCA",
  50: "#FEE4E2",
};

const warning = {
  900: "#4E1D09",
  800: "#7A2E0E",
  700: "#93370D",
  600: "#854708",
  500: "#DC6803",
  400: "#F79009",
  300: "#FDB022",
  200: "#FEC84B",
  100: "#FEDF89",
  50: "#FEF0C7",
};

const success = {
  900: "#053321",
  800: "#074D31",
  700: "#085D3A",
  600: "#067647",
  500: "#079455",
  400: "#17B26A",
  300: "#47CD89",
  200: "#75E0A7",
  100: "#ABEFC6",
  50: "#DCFAE6",
};

const gray = {
  900: "#0C111D",
  800: "#101828",
  700: "#182230",
  600: "#344054",
  500: "#475467",
  400: "#667085",
  300: "#98A2B3",
  200: "#D0D5DD",
  100: "#EAECF0",
  50: "#F2F4F7",
};

const base = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "#FFFFFF 0%",
};

export const palette = {
  mode: "dark" as PaletteMode,
  primary: {
    main: '#5D92FE',
  },
  brand: {
    main: "#7F56D9",
    ...brand,
  },
  base: base,
  gray: {
    main: "#667085",
    ...gray,
  },
  error: {
    main: "#F04438",
    ...error,
  },
  warning: {
    main: "#F79009",
    ...warning,
  },
  success: {
    main: "#17B26A",
    ...success,
  },
};
