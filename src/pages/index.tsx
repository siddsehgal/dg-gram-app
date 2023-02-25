import * as React from "react";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Auth from "@/components/auth";
import Home from "@/components/home";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function HomePage() {
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  return (
    <>
      <Head>
        <title>Dg Gram</title>
      </Head>
      {isLogin ? (
        <>
          <Home />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}
