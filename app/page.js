import About from "./_Components/(Home)/About";
import AnimatedSlider from "./_Components/(Home)/AnimatedSlider";
import CardHover from "./_Components/(Home)/CardHover";
import Courses from "./_Components/(Home)/Courses";
import NewCardHover from "./_Components/(Home)/NewCardHover";

export default function Home() {
  return (
    <>
      <AnimatedSlider />
      <About />
      <NewCardHover/>
      <Courses/>
    </>
  );
}
