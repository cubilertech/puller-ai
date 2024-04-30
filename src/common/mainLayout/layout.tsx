"use client";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "@/theme/CustomTheme";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    </Provider>
  );
}
