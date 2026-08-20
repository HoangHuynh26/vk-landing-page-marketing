import Hero from "../../components/hero/Hero";
import TrustBar from "../../components/trustbar/TrustBar";
import PainSolution from "../../components/painSolution/PainSolution";
import { caseStudies } from "../../components/caseStudies/caseStudyData";
import LiveNotification from "../../components/liveNotification/LiveNotification";
import LazyLoad from "../../components/common/LazyLoad";
import Statistics from "../../components/statistic/Statistics";
import { lazy, Suspense, useEffect } from "react";
import "./Home.css";

const Strategy = lazy(() => import("../../components/strategy/Strategy"));
const CaseStudy = lazy(() => import("../../components/caseStudies/CaseStudy"));
const LeadCTA = lazy(() => import("../../components/CTA/LeadCTA"));

export default function Home() {
  const shouldOpenForm = window.location.hash === "#lead-form";

  useEffect(() => {
    if (window.location.hash !== "#lead-form") return;

    let attempts = 0;
    const timer = window.setInterval(() => {
      const form = document.getElementById("lead-form");
      attempts += 1;
      if (form) {
        const top = form.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: "smooth" });
        window.clearInterval(timer);
      } else if (attempts >= 200) {
        window.clearInterval(timer);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="home-page">
      <Hero />
      <TrustBar />
      <Statistics />
      <PainSolution />
      <Suspense fallback={null}>
        <Strategy />
      </Suspense>
      <LazyLoad className="case-study-section page-shell">
        <Suspense fallback={null}>
          <CaseStudy studies={caseStudies} />
        </Suspense>
      </LazyLoad>
      <LazyLoad className="home-lead-cta-lazy" force={shouldOpenForm}>
        <Suspense fallback={null}>
          <LeadCTA />
        </Suspense>
      </LazyLoad>
      <LiveNotification />
    </main>
  );
}
