import { Theme } from "@mui/material";

export const MuiTablePagination = (theme: Theme) => {
  return {
    MuiTablePagination: {
      styleOverrides: {
        root: {
          // Styles for the pagination root element
        },
        ul: {
          // Styles for the pagination list element
        },
        item: {
          // Styles for each pagination item
        },
        page: {
          // Styles for the page number items
        },
        ellipsis: {
          // Styles for the ellipsis item (...)
        },
        previous: {
          // Styles for the previous page item
          backgroundColor: "red",
        },
        next: {
          // Styles for the next page item
        },
        actions: {
          // Styles for the actions container (rows per page selector and page navigation buttons)
        },
        input: {
          // Styles for the input field to jump to a specific page
        },
      },
    },
  };
};
