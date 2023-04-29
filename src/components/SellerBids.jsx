import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsClockFill } from "react-icons/bs";
import matic from "../assets/matic.svg";
import { NavbarTop } from "./NavbarTop";
import axios from "axios";
import { useParams } from "react-router";
import { getDIDToken } from "../web3/magic";
import { Rating } from "react-simple-star-rating";
import { MdPeopleAlt } from "react-icons/md";

export const SellerBids = () => {
  const [bids, setBids] = useState([]);
  const { projectId } = useParams();
  const pageNo = 0;
  async function fetchBids() {
    let headersList = {
      Accept: "*/*",
      token: await getDIDToken(),
    };

    console.log(headersList.token);

    let reqOptions = {
      url: `https://chaintusker-backend-wtr7x.ondigitalocean.app/bids/${projectId}/${pageNo}`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
    setBids(response?.data?.data);
  }

  console.log(bids);
  useEffect(() => {
    console.log('--------------------------------')
    fetchBids();
  }, []);
  return (
    <>
      {bids.map((bid, index) => (
        <Container className="aboutClient rounded-3 py-3 my-3" key={index}>
          <Row>
            <Col xs={8}>
              <h4>{bid?.title}</h4>
              <h5>
                {bid?.publicAddress ? bid.publicAddress : bid.seller_id.email}
              </h5>
            </Col>
            <Col className="text-end">
              <h4>
                <span className="fw-light">
                  <img src={matic} alt="" width={25} />
                </span>{" "}
                {bid.price}
              </h4>
              <h5 className="fw-light">
                <BsClockFill className="me-2" />
                {bid.days} days
              </h5>
            </Col>
          </Row>
          <p className="fs-6 fw-light">{bid.desc}</p>
          <Row>
            <Col className="mt-4">
              <MdPeopleAlt size={26} />
              <Rating
                initialValue={bid?.seller_id?.rating}
                readonly={true}
                size={22}
              />
            </Col>
            <Col>
              <Container className="text-end mt-3">
                <Button className="me-2">Message</Button>
                <Button variant="secondary">Assign</Button>
              </Container>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
};
