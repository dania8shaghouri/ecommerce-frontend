import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/home/hero/Hero";
import Features from "../components/home/features/Features";
import Categories from "../components/home/categories/Categories";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#categories") {
      setTimeout(() => {
        document
          .getElementById("categories")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);
  return (
    <>
      <Hero />
      <Features />
      <Categories />
    </>
  );
};

export default HomePage;
