import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AppNav } from "../components/AppNav";
import { Footer } from "../components/Footer";
import { NavbarTop } from "../components/NavbarTop";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getDIDToken } from "../web3/magic";

export const PostBid = () => {
  const id = useParams().projectId;
  const user = useSelector((state) => state.login.user);
  // const [categories, setCategories] = useState([]);
  const [bid, setBid] = useState({
    title: "",
    description: "",
    milestone: [{ days: "", price: "", desc: "" }],
  });

  const handleChange = (e) => {
    setBid({
      ...bid,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeMilestone = (e) => {
    const index = e.target.dataset.index;

    setBid((prevState) => {
      const newMileArray = [...prevState.milestone];
      newMileArray[index] = {
        ...newMileArray[index],
        [e.target.name]: e.target.value,
      };
      return { ...prevState, milestone: newMileArray };
    });
  };

  const handleAddMilestone = () => {
    setBid((prevState) => ({
      ...prevState,
      milestone: [...prevState.milestone, { days: "", price: "", desc: "" }],
    }));
  };

  const removeMilestone = (e) => {
    if (e.target.dataset.index > 0) {
      console.log("enter");
      //do nothing for now
      setBid((prevState) => {
        const newMileArray = [...prevState.milestone];
        newMileArray.splice(e.target.dataset.index, 1);
        return { ...prevState, milestone: newMileArray };
      });
    } else {
      toast.error("A bid must contain atleast 1 Milestone", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle api call and submit form data
    const DIDToken = await getDIDToken();

    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      title: bid.title,
      desc: bid.description,
      milestone: bid.milestone,
    });


    let reqOptions = {
      url: `https://chaintusker-backend-wtr7x.ondigitalocean.app/bid/${id}`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    console.log(bodyContent);

    let response = await axios.request(reqOptions);
    console.log(response.data);
  };

  return (
    <>
      <Container className="bg-custom rounded-5 py-5 px-0">
        <h2>Post a Bid</h2>
        <h4>Fill in the form below to post a Bod for the project</h4>
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="bidTitleInput">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title for the Bid"
              name="title"
              value={bid.title}
              className="fs-5 py-2 bg-transparent text-light rounded-0"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bidDescriptionInput">
            <Form.Label className="fs-5">Bid Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter bid description"
              name="description"
              value={bid.description}
              className="fs-5 py-2 bg-transparent text-light rounded-0"
              onChange={handleChange}
              required
            />
          </Form.Group>
          {bid.milestone.map((milestone, i) => {
            return (
              <div key={i} className="mb-3">
                <Form.Label className="fs-5">Milestone {i + 1}</Form.Label>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="bidTimeRequiredInput"
                    >
                      <Form.Label>Days Required for Completion</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter the time required for this Milestone in days"
                        name="days"
                        data-index={i}
                        value={milestone.days}
                        className="fs-5 py-2 bg-transparent text-light rounded-0"
                        onChange={handleChangeMilestone}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="bidMilestonePriceInput"
                    >
                      <Form.Label>Payment for Milestone</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter your price in MATIC"
                        name="price"
                        data-index={i}
                        value={milestone.price}
                        className="fs-5 py-2 bg-transparent text-light rounded-0"
                        onChange={handleChangeMilestone}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Form.Group
                    className="mb-3"
                    controlId="milestoneDescriptionInput"
                  >
                    <Form.Label>Milestone Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter a short milestone description"
                      name="desc"
                      data-index={i}
                      value={milestone.desc}
                      className="fs-5 py-2 bg-transparent text-light rounded-0"
                      onChange={handleChangeMilestone}
                      required
                    />
                  </Form.Group>
                </Row>
                {i > 0 ? (
                  <Button
                    type="button"
                    data-index={i}
                    onClick={removeMilestone}
                  >
                    Remove Milestone
                  </Button>
                ) : null}
              </div>
            );
          })}
          <Button
            variant="secondary"
            className="me-3 border"
            onClick={handleAddMilestone}
          >
            Add Milestone
          </Button>
          <Button type="submit">POST</Button>
        </Form>
      </Container>
    </>
  );
};

export default PostBid;
