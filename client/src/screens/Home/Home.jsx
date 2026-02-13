import { useLocation } from "react-router-dom";
import BlogCards from "../BlogCards/BlogCards";
import Hero from "../../Components/Hero/Hero";
import TrendingSection from "../../Components/TrendingSection/TrendingSection";

const Home = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div>
      {isHome && <Hero />}
      <TrendingSection />
      <BlogCards />
    </div>
  );
};

export default Home;
