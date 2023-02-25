import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import PostComponent from "@/components/post";

const theme = createTheme({
  // palette: { mode: "dark" },
});

export default function Search() {
  const router = useRouter();
  const post_id: number = Number(router.query?.post_id);
  return (
    <ThemeProvider theme={theme}>
      <PostComponent post_id={post_id} />
    </ThemeProvider>
  );
}
