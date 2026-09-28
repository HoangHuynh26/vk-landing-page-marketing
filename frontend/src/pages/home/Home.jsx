import Hero from "../../components/hero/Hero";
import TrustBar from "../../components/trustbar/TrustBar";
import PainSolution from "../../components/painSolution/PainSolution";
import Statistics from "../../components/statistic/Statistics";
import Testimonial from "../../components/testimonial/Testimonial";
import Strategy from "../../components/strategy/Strategy";
import CaseStudy from "../../components/caseStudies/CaseStudy";
import LeadCTA from "../../components/CTA/LeadCTA";
import { caseStudies } from "../../components/caseStudies/caseStudyData";
import LazyLoad from "../../components/common/LazyLoad";
import { useEffect, useState } from "react";
import "./Home.css";

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

      <LazyLoad className="trustbar-section" id="trustbar" force={true}>
        <TrustBar />
      </LazyLoad>

      <LazyLoad className="statistics-section" id="statistics">
        <Statistics />
      </LazyLoad>

      <LazyLoad className="pain-solution-section" id="pain-solution">
        <PainSolution />
      </LazyLoad>

      <LazyLoad className="strategy-wrapper" id="strategy">
        <Strategy />
      </LazyLoad>

      <LazyLoad className="case-study-section" id="case-studies">
        <CaseStudy studies={caseStudies} />
      </LazyLoad>

      <LazyLoad className="testimonial-section" id="testimonials">
        <Testimonial />
      </LazyLoad>

      <LazyLoad className="home-lead-cta-lazy" force={shouldOpenForm}>
        <LeadCTA />
      </LazyLoad>
    </main>
  );
}