import About from "./_Components/(Home)/About";
import AnimatedSlider from "./_Components/(Home)/AnimatedSlider";
import NewCardHover from "./_Components/(Home)/NewCardHover";
import Team from "./_Components/(Home)/Team";
import Courses from "./_Components/(Home)/Courses";
import ExploreCourses from "./_Components/(Home)/ExploreCourses";

export default function Home() {
  return (
    <>
      <AnimatedSlider />
      <About />
      <NewCardHover />
      <Courses />
      <ExploreCourses />
      <Team />
    </>
  );
}
