import React from "react";
// import ReactLoading from "react-loading";
import { FadeLoader } from "react-spinners";
import { NavbarTop } from "./NavbarTop";
import { Footer } from "./Footer";

export const Loading = () => {
  return (
    <div>
      <NavbarTop />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <FadeLoader type="spinningBubbles" color="#FFF" />
      </div>
      <Footer />
    </div>
  );
};
