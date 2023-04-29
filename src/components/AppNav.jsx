import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AppNav = () => {
  return (
    <div className="container-fluid app-nav py-2">
      <Container>
        <ul className="d-flex list-unstyled mb-0">
          <li className="me-4">
            <Link to="/projects">All Projects</Link>
          </li>
          <li className="me-4">
            <Link to="/post-project">Post a Project</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};
