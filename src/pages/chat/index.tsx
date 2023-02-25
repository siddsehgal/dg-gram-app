import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import ChatComponent from "@/components/chat";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  // palette: { mode: "dark" },
});

export default function Search() {
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  return (
    <ThemeProvider theme={theme}>
      <ChatComponent />
    </ThemeProvider>
  );
}
