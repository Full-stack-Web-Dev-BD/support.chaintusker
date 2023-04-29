import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import webDesign from "../assets/webDesign.png";
import ui from "../assets/ui-ux.png";
import logoDesign from "../assets/logoDesign.png";
import mobileApp from "../assets/mobileApp.png";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";

export const PopularHome = () => {
  // Array of objects to map through
  const popular = [
    {
      title: "Web Design",
      text: "Find professionals you can trust by browsing their samples of previous work and reading their profile reviews.",
      img: webDesign,
    },
    {
      title: "UI/UX Design",
      text: "Receive obligation free quotes from our talented freelancers fast. 80% of projects get bid on within 60 seconds..",
      img: ui,
    },
    {
      title: "Logo Design",
      text: "Freelancer.com has by far the largest pool of quality freelancers globally- over 60 million to choose from.",
      img: logoDesign,
    },
    {
      title: "Mobile App Design",
      text: "Keep up-to-date and on-the-go with our time tracker, and mobile app. Always know what freelancers are up to.",
      img: mobileApp,
    },
  ];

  return (
    <Container id="popularHome-main">
      <h2>Popular on Chaintusker</h2>

      <Row className="mt-5" xs={1} md={2}>
        {popular.map((pop, index) => (
          <Col className="mb-4">
            <Card
              className="bg-transparent border-0"
              style={{
                height: "250px",
                width: "auto",
                backgroundImage: `url(${pop.img})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Card.Body className="p-0">
                <Card.Title className="text-center py-2 mb-0">
                  {pop.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
    </Container>
  );
};
