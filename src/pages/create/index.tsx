import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import CreateComponent from "@/components/create";

const theme = createTheme({
  // palette: { mode: "dark" },
});

export default function Search() {
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  return (
    <ThemeProvider theme={theme}>
      <CreateComponent />
    </ThemeProvider>
  );
}
