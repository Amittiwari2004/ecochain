import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { InternetIdentityProvider } from "ic-use-internet-identity";
import { initAuth } from "./services/auth";

initAuth();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InternetIdentityProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InternetIdentityProvider>
  </React.StrictMode>
);
