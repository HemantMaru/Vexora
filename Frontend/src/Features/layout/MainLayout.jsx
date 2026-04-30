import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Dashboard/Components/Home/Navbar";
import Footer from "../Dashboard/Components/Home/Footer";
import ScrollTop from "../Scrolltop";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollTop />
    </>
  );
};

export default MainLayout;
