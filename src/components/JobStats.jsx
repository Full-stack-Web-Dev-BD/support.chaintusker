import React from "react";
import { Col } from "react-bootstrap";

export const JobStats = () => {
  return (
    <Col sm={8}>
      <div id="jobStats">
        <h2 className="mb-3">Job Proficiency</h2>
        <div>
          <h4 className="mb-0 fw-light fs-4">Completed Jobs</h4>
          <p className="fs-4">0</p>
        </div>
        <div>
          <h4 className="mb-0 fw-light fs-4">On Time Jobs</h4>
          <p className="fs-4">0</p>
        </div>
        <div>
          <h4 className="mb-0 fw-light fs-4">Avg. Order Price</h4>
          <p className="fs-4">$0</p>
        </div>
        <div>
          <h4 className="mb-0 fw-light fs-4">Job Success Rate</h4>
          <p className="fs-4">0%</p>
        </div>
      </div>
    </Col>
  );
};
