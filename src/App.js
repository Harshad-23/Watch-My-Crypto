import { makeStyles } from "@mui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { darkTheme } from "./config/theme";
import Header from "./components/header";
import CoinPage from "./pages/coinPage";
import HomePage from "./pages/homepage";
import ErrorPage from "./pages/errorPage";
import Footer from "./components/footer";

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
            <Route path="*" element={<ErrorPage query="page" />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
