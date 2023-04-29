import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export const BidForm = () => {
  return (
    <div>
      <Form>
        <Row
        className="mt-4"
            xs={1}
            md={2}
        >
          <Col>
            <Form.Group className="mb-3" controlId="bidAmount">
              <Form.Label>Bid Amount</Form.Label>
              <Form.Control
                className="rounded-0 bg-primary border-0 fs-5 text-light py-2"
                type="number"
                placeholder="Enter bid amount in MATIC"
              />
              <Form.Text className="text-light fw-lighter">
                Conversion to USD: $0
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="bidDuration">
              <Form.Label>Bid Duration</Form.Label>
              <Form.Control
                className="rounded-0 bg-primary border-0 fs-5 text-light py-2"
                type="number"
                placeholder="7"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="bidMessage">
            <Form.Label>Describe Your Proposal</Form.Label>
            <Form.Control
                className="rounded-0 bg-transparent border fs-5 text-light py-2"
                as="textarea"
                rows={8}
                placeholder="Enter your proposal here"
            />
        </Form.Group>
        <Button variant="primary" className="shadow fs-5 px-5 py-2 mt-4 mb-5" type="submit">Place Bid</Button>
      </Form>
    </div>
  );
};
