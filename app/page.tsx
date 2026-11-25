import type { ReactNode } from "react";
import Topbar from "../components/sections/Topbar";
import Header from "../components/sections/Header";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import WhyChoose from "../components/sections/WhyChoose";
import Testimonials from "../components/sections/Testimonials";
import Faq from "../components/sections/Faq";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import BackToTop from "../components/ui/BackToTop";
import { common, pages, sections } from "../components/types";

const sectionMap: Record<string, ReactNode> = {
  Hero: <Hero data={sections.hero} />,
  About: <About data={sections.about} />,
  Services: <Services data={sections.services} />,
  WhyChoose: <WhyChoose data={sections.why} />,
  Testimonials: <Testimonials data={sections.testimonials} />,
  Faq: <Faq data={sections.faq} />,
  Contact: <Contact data={sections.contact} />,
};

export const metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#10224a]">
      <Topbar data={common.Topbar} />
      <Header data={common.Header} />
      <main className="flex-1">
        {pages.home.components.map((block) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
