import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";
import App from "./App";
import CryptoContext from "./cryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
