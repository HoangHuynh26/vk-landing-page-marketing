import MobileActionBar from "../common/MobileActionBar";
import Navbar from "../navbar/Navbar";
import Chatbot from "../chatbot/Chatbot";
import Home from "../../pages/home/Home";
import LeadModal from "../CTA/LeadModal";
import LiveNotification from "../liveNotification/LiveNotification";
import ScrollToTop from "../common/ScrollToTop";
import Footer from "../footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Home />
      <div className="footer-reveal-spacer" aria-hidden="true" />
      <Footer />
      <Chatbot />
      <ScrollToTop />
      <LeadModal />
      <LiveNotification />
      <MobileActionBar />
    </>
  );
}
