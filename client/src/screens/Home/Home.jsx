import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogCards from "../BlogCards/BlogCards";
import Hero from "../../Components/Hero/Hero";
import TrendingSection from "../../Components/TrendingSection/TrendingSection";

const Home = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div>
      <Helmet>
        <title>NazimBlogs - Discover Stories That Inspire</title>
        <meta name="description" content="Your go-to platform for insightful articles, trending topics, and expert perspectives." />
        <meta property="og:title" content="NazimBlogs" />
        <meta property="og:description" content="Your go-to platform for insightful articles, trending topics, and expert perspectives." />
      </Helmet>
      {isHome && <Hero />}
      <TrendingSection />
      <BlogCards />
    </div>
  );
};

export default Home;
