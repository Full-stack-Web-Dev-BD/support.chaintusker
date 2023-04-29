import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { BidForm } from "./BidForm";
import { ProfileCard } from "./ProfileCard";
import { SellerBids } from "./SellerBids";
import PostBid from "../pages/PostBid";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export const ProjectDetailBid = () => {
  const [projectData, setProjectData] = useState({});

  const address = useSelector((state) => state.login.data.publicAddress);
  const { projectId } = useParams();

  function fetchProjectDetails() {
    axios
      .get(`https://chaintusker-backend-wtr7x.ondigitalocean.app/project/${projectId}`)
      .then((response) => {
        setProjectData(response?.data?.data);
      });
  }

  useEffect(() => {
    fetchProjectDetails();
  }, []);
  console.log("projectData: ", projectData);

  return (
    <Col md={8}>
      <div className="bg-custom rounded-5 p-md-5 p-4 shadow">
        <ProfileCard buyer={projectData?.buyerDetails} />
        <h3 className="my-4">{projectData?.title}</h3>
        <p className="fw-light">{projectData?.desc}</p>
        <h3 className="my-4">Skills Required</h3>
        <div className="d-flex flex-wrap">
          {projectData?.skills_required?.map((skill, index) => (
            <div className="bg-custom p-2 rounded-3 me-2 mb-2" key={index}>
              {skill}
            </div>
          ))}
        </div>
        <h3 className="my-4">Attachments</h3>
        <div className="d-flex flex-wrap">
          <div className="bg-custom p-2 rounded-3 me-2 mb-2">
            Attachment Goes Here
          </div>
        </div>
        {/* <BidForm /> */}
        {projectData &&
        projectData.buyerDetails?.wallet_address?.toLowerCase() ===
          address?.toLowerCase() ? (
          <>
            <h3 className="my-4">Bids</h3>
            <SellerBids />
          </>
        ) : (
          <PostBid />
        )}
      </div>
    </Col>
  );
};
