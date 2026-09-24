import MobileActionBar from "../common/MobileActionBar";
import { lazy, Suspense } from "react";
import Navbar from "../navbar/Navbar";
import Chatbot from "../chatbot/Chatbot";
import Home from "../../pages/home/Home";
import LeadModal from "../CTA/LeadModal";
import LiveNotification from "../liveNotification/LiveNotification";
import ScrollToTop from "../common/ScrollToTop";
import LazyLoad from "../common/LazyLoad";

const Footer = lazy(() => import("../footer/Footer"));

export default function Layout() {
  return (
    <>
      <Navbar />
      <Home />
      <LazyLoad className="footer-section" id="footer">
        <Suspense fallback={<div className="lazy-section-placeholder" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </LazyLoad>
      <Chatbot />
      <ScrollToTop />
      <LeadModal />
      <LiveNotification />
      <MobileActionBar />
    </>
  );
}
