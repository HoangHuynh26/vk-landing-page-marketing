import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Loading from "../components/loading/Loading";
import Home from "../pages/home/Home";

const About = lazy(() => import("../pages/about/About"));
const CaseStudies = lazy(() => import("../pages/caseStudies/CaseStudies"));
const FAQPage = lazy(() => import("../pages/FAQ/FAQPage"));

export default function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
