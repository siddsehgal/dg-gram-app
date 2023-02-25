import MiniDrawer from "@/components/navigation/sideDrawer";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Profile from "@/components/profile";
import { useRouter } from "next/router";

const theme = createTheme({
  // palette: { mode: "dark" },
});

export default function ProfilePage() {
  const router = useRouter();
  const user_id: number = router.query?.user_id
    ? Number(router.query?.user_id)
    : 0;
  return (
    <ThemeProvider theme={theme}>
      <Profile user_id={user_id} />
    </ThemeProvider>
  );
}
