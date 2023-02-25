import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import PreProcess from "@/components/preProcessing/preProcess";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import BottomNav from "@/components/navigation/bottomNav";
import NavBar from "@/components/navigation/navBar";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  // palette: { mode: "dark" },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dg Gram</title>
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider autoHideDuration={3000}>
          <NavBar />
          <PreProcess Component={Component} pageProps={pageProps} />
          <BottomNav />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
