import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import SearchComponent from "@/components/search";

const theme = createTheme({
  // palette: { mode: "dark" },
});

export default function Search() {
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  return (
    <ThemeProvider theme={theme}>
      <SearchComponent />
    </ThemeProvider>
  );
}
