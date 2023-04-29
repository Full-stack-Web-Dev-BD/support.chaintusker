import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="box ">
      <div>close !</div>
      <p>
        <span>error 404!</span> sorry page isn't found for one of the reformes{" "}
      </p>
      <Link to="/" id="eroor-btn">
        Go Home
      </Link>
    </div>
  );
};
