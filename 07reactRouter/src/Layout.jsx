import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      {/* The <Outlet /> is where the nested/child route content gets rendered */}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
