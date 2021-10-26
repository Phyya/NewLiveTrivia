import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { StoreProvider } from "./context/Store";
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
defineCustomElements(window);
