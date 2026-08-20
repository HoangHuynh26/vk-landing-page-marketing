import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Chatbot from "../chatbot/Chatbot";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Chatbot />
    </>
  );
}
