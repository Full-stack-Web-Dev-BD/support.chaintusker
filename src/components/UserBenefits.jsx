import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import benefit1 from "../assets/benefit1.png";
import benefit2 from "../assets/benefit2.png";
import { Slide } from "react-awesome-reveal";

export const UserBenefits = () => {
  return (
    <Container id="userBenefit-main" className="overflow-hidden">
      <Row className="my-5" xs={1} md={2}>
        <Col className="d-flex flex-column justify-content-center align-items-start">
          <Slide triggerOnce={true} direction="left">
            <img src={benefit1} alt="" className="benefitImg" />
          </Slide>
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-end">
          <Slide direction="right" triggerOnce={true}>
            <div className="text-end">
              <h2>Freelancer Benefits</h2>
              <p>
                Our cross border friendly business model ensures swift payment
                for your work as soon as the client approves your work. Payment
                in cryptocurrency also ensures that you avoid exchange
                rates related losses.
              </p>
              <Button>Learn More</Button>
            </div>
          </Slide>
        </Col>
      </Row>
      <Row xs={1} md={2} className="my-5 flex-column-reverse flex-md-row">
        <Col className="d-flex flex-column justify-content-center align-items-start">
          <Slide triggerOnce={true} direction="left">
            <div>
              <h2>Client Benefits</h2>
              <p className="">
                The Chaintusker platform has become the most popular platform
                for businesses because we attract the best freelancers who take
                advantage of our flexibility and fast delivery systems. Our
                platform offers the most advanced services including blockchain
                technology solutions not available anywhere else on
                other platforms.
              </p>
              <Button>Learn More</Button>
            </div>
          </Slide>
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-start">
          <Slide direction="right" triggerOnce={true}>
            <img src={benefit2} alt="" className="benefitImg" />
          </Slide>
        </Col>
      </Row>
    </Container>
  );
};
