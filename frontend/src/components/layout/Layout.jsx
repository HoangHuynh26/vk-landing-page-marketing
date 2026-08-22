import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Chatbot from "../chatbot/Chatbot";
import Home from "../../pages/home/Home";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <Chatbot />
    </>
  );
}
