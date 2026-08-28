import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Chatbot from "../chatbot/Chatbot";
import Home from "../../pages/home/Home";
import LeadModal from "../CTA/LeadModal";
import LiveNotification from "../liveNotification/LiveNotification";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <Chatbot />
      <LeadModal />
      <LiveNotification />
    </>
  );
}
