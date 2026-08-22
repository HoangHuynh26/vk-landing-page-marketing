import Hero from "../../components/hero/Hero";
import TrustBar from "../../components/trustbar/TrustBar";
import PainSolution from "../../components/painSolution/PainSolution";
import { caseStudies } from "../../components/caseStudies/caseStudyData";
import LiveNotification from "../../components/liveNotification/LiveNotification";
import LazyLoad from "../../components/common/LazyLoad";
import Statistics from "../../components/statistic/Statistics";
import { lazy, Suspense, useEffect, useState } from "react";
import "./Home.css";

const Strategy = lazy(() => import("../../components/strategy/Strategy"));
const CaseStudy = lazy(() => import("../../components/caseStudies/CaseStudy"));
const LeadCTA = lazy(() => import("../../components/CTA/LeadCTA"));

export function getShouldOpenForm(hash) {
  return hash === "#lead-form" || hash === "#faq";
}

export function getHashTarget(hash) {
  return hash === "#faq" ? "faq" : "lead-form";
}

export default function Home() {
  const [shouldOpenForm, setShouldOpenForm] = useState(
    getShouldOpenForm(window.location.hash),
  );

  useEffect(() => {
    const handleHashChange = () => {
      setShouldOpenForm(getShouldOpenForm(window.location.hash));
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (!shouldOpenForm) return;

    let attempts = 0;
    const timer = window.setInterval(() => {
      const target = document.getElementById(getHashTarget(window.location.hash));
      attempts += 1;
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: "smooth" });
        window.clearInterval(timer);
      } else if (attempts >= 200) {
        window.clearInterval(timer);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [shouldOpenForm]);

  return (
    <main className="home-page" id="top">
      <Hero />
      <TrustBar />
      <Statistics />
      <PainSolution />
      <section id="strategy">
        <Suspense fallback={null}>
        <Strategy />
        </Suspense>
      </section>
      <LazyLoad className="case-study-section page-shell" id="case-studies">
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
