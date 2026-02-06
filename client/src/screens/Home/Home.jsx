import BlogCards from "../BlogCards/BlogCards";
import Hero from "../../Components/Hero/Hero";
import TrendingSection from "../../Components/TrendingSection/TrendingSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrendingSection />
      <BlogCards />
    </div>
  );
};

export default Home;
