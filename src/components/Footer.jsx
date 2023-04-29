import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export const Footer = () => {
  // Array of social media links
  const socials = [
    {
      link: "https://www.facebook.com/",
      icon: <FaFacebookF />,
    },
    {
      link: "https://www.twitter.com/",
      icon: <FaTwitter />,
    },
    {
      link: "https://www.instagram.com/",
      icon: <FaInstagram />,
    },
    {
      link: "https://t.me/",
      icon: <FaTelegramPlane />,
    },
  ];

  return (
    <div>
      
    {/* <div id="footer-main">
      <Container className="border-bottom pb-2">
        <Row xs={1} md={2} lg={4}>
          <Col>
            <Link to="/"><img src={logo} alt="" style={{maxWidth:"150px"}} /></Link>
            <ul className="socials list-unstyled d-flex justify-content-start align-items-center mt-5">
              {socials.map((social, index) => (
                <li key={index} className="socials__item mx-2">
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="socials__link"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer__link">
                  <BsFillQuestionCircleFill />
                  &nbsp; Help Center
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h5>Terms</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer__link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="footer__link">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h5>Dashboard</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer__link">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/" className="footer__link">
                  Sign Up
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <p className="text-muted py-3 mb-0 text-center">
        © 2023 Chaintusker. All rights reserved.
      </p>
    </div> */}
      
    </div>
  );
};
