import Hero from '../components/sections/index/hero';
import Looking from '../components/sections/index/looking';
import About from '../components/sections/index/about';
// import Technical from '../components/sections/index/technical';
import Career from '../components/sections/index/career';
// import FeaturedProjects from '../components/sections/projects/featured';
import Color from '../components/utils/page.colors.util';
import colors from '../content/index/_colors.json';
import ResumeButton from '../components/ResumeButton'; // Import the ResumeButton component

export default function HomePage() {
  return (
    <>
      <Color colors={colors} />
      <Hero />
      {/* <FeaturedProjects /> */}
      <About />
      {/*<Technical />*/}
      <ResumeButton showIframe={false} /> {/* Hide iframe on homepage */}
    </>
  );
}
