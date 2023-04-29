import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaWallet } from "react-icons/fa";

export const EarningStats = () => {
  return (
    <Row className="my-5 g-4" xs={1} md={2}>
      <Col>
        <div className="earningStat-card bg-custom shadow">
          <h3>Total Earnings</h3>
          <div className="border-bottom my-3 w-75 mx-auto">
            <h4>$5000</h4>
            <p>since joining Chaintusker</p>
          </div>
          <div className=" w-75 mx-auto">
            <h4>$500</h4>
            <p>past 30 days</p>
          </div>
        </div>
      </Col>
      <Col>
        <div className="bg-custom earningStat-card shadow h-100">
          <h3>Earning Per Client</h3>
          <FaWallet size={64} className="d-block mx-auto mb-3 mt-4" />
          <h4>$300</h4>
        </div>
      </Col>
    </Row>
  );
};
