import { makeStyles } from "@mui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { darkTheme } from "./config/theme";
import Header from "./components/header";
import Footer from "./components/footer";
import Alert from "./components/alert";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";

const CoinPage = lazy(() => import("./pages/coinPage"));
const HomePage = lazy(() => import("./pages/homepage"));
const ErrorPage = lazy(() => import("./pages/errorPage"));

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.App}>
          <Header />
          <Suspense fallback={<LinearProgress />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/coins/:id" element={<CoinPage />} />
              <Route path="*" element={<ErrorPage query="page" />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
        <Alert />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
