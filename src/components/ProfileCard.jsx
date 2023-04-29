import React from "react";
import { MdVerifiedUser, MdPeopleAlt } from "react-icons/md";
import { Rating } from "react-simple-star-rating";

export const ProfileCard = ({buyer}) => {
  console.log("buyer: ", buyer);
  return (
    <div className="d-flex" id="profileCard">
      <img
        src="https://images.unsplash.com/photo-1678649878724-7804e7d37ea8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <div className="ps-2">
        <h4 className="mb-0">
          {buyer?.email} <MdVerifiedUser color="#38E325" />
        </h4>
        <p className="mb-0">Location</p>
        <div className="d-flex">
          <MdPeopleAlt size={26} />
          <Rating initialValue={buyer?.total_ratings} readonly={true} size={22} />
        </div>
      </div>
    </div>
  );
};
