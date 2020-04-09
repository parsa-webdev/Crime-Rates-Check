import React from "react";
import "./App.scss";
import Data from "./components/Data";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="main">
      <Header />
      <Data />
      <Footer />
    </div>
  );
}
