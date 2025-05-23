import About from "./_Components/(Home)/About";
import AnimatedSlider from "./_Components/(Home)/AnimatedSlider";
import NewCardHover from "./_Components/(Home)/NewCardHover";
import Team from "./_Components/(Home)/Team";
import Courses from "./_Components/(Home)/Courses";
import ExploreCourses from "./_Components/(Home)/ExploreCourses";
import AboutGrid from "./_Components/(Home)/AboutGrid";
import Clients from "./_Components/(Home)/ClientSection";
import FAQs from "./_Components/(Home)/FAQs";
import PricingSection from "./_Components/(Home)/PricingSection";
import PricingSection1 from "./_Components/(Home)/PricingSection1";
import PricingPage from "./pricing/page";

export default function Home() {
  return (
    <>
      {/* <AnimatedSlider />
      <About /> */}
      <AboutGrid/>
      <Clients/>
      <NewCardHover />
      <ExploreCourses />
      <Courses />      
      {/* <PricingSection/> */}
      {/* <PricingSection1/> */}
      <PricingPage/>
      <Team />
      <FAQs/>
    </>
  );
}
