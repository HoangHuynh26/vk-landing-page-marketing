import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import { LanguageProvider } from "./i18n/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  </BrowserRouter>,
);
