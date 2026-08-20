import Hero from "../../components/hero/Hero";
import TrustBar from "../../components/trustbar/TrustBar";
import PainSolution from "../../components/painSolution/PainSolution";
import { caseStudies } from "../../components/caseStudies/caseStudyData";
import LiveNotification from "../../components/liveNotification/LiveNotification";
import LazyLoad from "../../components/common/LazyLoad";
import Statistics from "../../components/statistic/Statistics";
import { lazy, Suspense } from "react";
import "./Home.css";

const Strategy = lazy(() => import("../../components/strategy/Strategy"));
const CaseStudy = lazy(() => import("../../components/caseStudies/CaseStudy"));
const LeadCTA = lazy(() => import("../../components/CTA/LeadCTA"));

export default function Home() {
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
      <LazyLoad className="home-lead-cta-lazy">
        <Suspense fallback={null}>
          <LeadCTA />
        </Suspense>
      </LazyLoad>
      <LiveNotification />
    </main>
  );
}
