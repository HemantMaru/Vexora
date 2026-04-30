import React from "react";
import Hero from "../Components/Home/Hero";
import Category from "../Components/Home/Category";
import Features from "../Components/Home/Features";
import Banner from "../Components/Home/Banner";
import Newarrival from "../Components/Home/Newarrival";
import Newsletter from "../Components/Home/Newsletter";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Category />
        <Features />
        <Banner />
        <Newarrival />
        <Newsletter />
      </main>
    </>
  );
};

export default Home;
