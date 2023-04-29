import React from "react";
import { NavbarTop } from "../components/NavbarTop";
import { AppNav } from "../components/AppNav";
import { Footer } from "../components/Footer";
import { Container, Row } from "react-bootstrap";
import { ProjectDetailBid } from "../components/ProjectDetailBid";
import { AboutClient } from "../components/AboutClient";

export const ProjectDetail = () => {
  return (
    <div>
      <NavbarTop />
      <AppNav />
      <Container className="my-5">
        <Row className="p-2 p-md-0 g-4">
          <ProjectDetailBid />
          <AboutClient/>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
