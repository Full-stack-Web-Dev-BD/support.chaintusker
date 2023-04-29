import React from "react";
import { Card } from "react-bootstrap";
import { SlOptions } from "react-icons/sl";

export const ChatCards = ({chat}) => {
  return (
    <div id="chatCards" className="my-3">
      <div className="d-flex">
        <img
          src="https://images.unsplash.com/photo-1679163145027-6fd57a3a8179?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt=""
        />
        <div className="d-flex flex-column w-100 ps-2">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex">
            <p className="fw-semibold me-2">{chat.name}</p>
            <p>{chat.username}</p>
            </div>
            <SlOptions />
          </div>
          <span className="fw-light">{chat.time}</span>
        </div>
      </div>
      <p className="fs-6 fw-light mt-2">{chat.message}</p>
    </div>
  );
};
