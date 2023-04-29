import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavbarTop } from "../components/NavbarTop";
import { Footer } from "../components/Footer";
import { ProfileOptions } from "../components/ProfileOptions";

export const UserProfile = () => {
  return (
    <div>
      <NavbarTop />
      <Container className="my-5">
        <Row>
          <Col md={8}>
            <div className="bg-custom rounded-5">
              <ProfileOptions />
            </div>
          </Col>
          <Col md={4}>
            <div className="bg-custom rounded-5">
              <ProfileOptions />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};