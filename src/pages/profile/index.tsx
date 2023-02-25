import MiniDrawer from "@/components/navigation/sideDrawer";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Profile from "@/components/profile";

const theme = createTheme({
  // palette: { mode: "dark" },
});

export default function ProfilePage() {
  return (
    <ThemeProvider theme={theme}>
      <Profile user_id={0} />
    </ThemeProvider>
  );
}
