import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/layout/Layout";
import { LanguageProvider } from "./i18n/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LanguageProvider>
    <Layout />
  </LanguageProvider>,
);
