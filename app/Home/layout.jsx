import React from "react";
import Header from "../_Components/Header";
import Footer from "../_Components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
