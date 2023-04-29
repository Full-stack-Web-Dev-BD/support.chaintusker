import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import browse from "../assets/browse.svg";
import fastBids from "../assets/fastBids.svg";
import qualityWork from "../assets/qualityWork.svg";
import trackProgress from "../assets/trackProgress.svg";
import { Flip } from "react-awesome-reveal";

export const FeaturesCards = () => {
  // Array of objects to map through
  const features = [
    {
      title: "Explore freelancers",
      text: "Browse through our community of freelancers and select the best ones that suit your needs.",
      img: browse,
    },
    {
      title: "Flexible",
      text: "Our flexible payment system allows customers to close deals faster than any other freelancing platforms.",
      img: fastBids,
    },
    {
      title: "Great results",
      text: "Our cross border friendly business model has seen the best freelancers joining our community ensuring the best results for our clients.",
      img: qualityWork,
    },
    {
      title: "Track progress",
      text: "Chaintusker allows flexible communication between users via the platform ensuring continuous feedback between the users.",
      img: trackProgress,
    },
  ];

  return (
    <Container id="featureCards">
      <h2>What's great about it?</h2>
      <Row className="mt-5" xs={1} md={2}>
        {features.map((feature, index) => (
          <Col className="mb-4" key={index}>
            <Flip
              className="h-100"
              direction={index % 2 === 0 ? "vertical" : "horizontal"}
              triggerOnce={true}
              delay={index * 100}
            >
              <Card className="flex-lg-row py-5 px-3 shadow h-100">
                <Card.Img
                  variant="top"
                  src={feature.img}
                  style={{ width: "150px" }}
                />
                <Card.Body>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text className="fw-light">{feature.text}</Card.Text>
                </Card.Body>
              </Card>
            </Flip>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
