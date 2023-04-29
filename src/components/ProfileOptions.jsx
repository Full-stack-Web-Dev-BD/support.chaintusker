import React from "react";

export const ProfileOptions = () => {
  return (
    <div className="d-flex align-items-center justify-content-between p-3">
      <div className="d-flex align-items-center">
        <img
          src="https://avatars.githubusercontent.com/u/61988162?v=4"
          alt="profile"
          className="rounded-circle"
          width="50"
        />
        <div className="ms-3">
          <h5 className="mb-0">John Doe</h5>
          <p className="mb-0">
            <small>Web Developer</small>
          </p>
        </div>
      </div>
    </div>
  );
};
