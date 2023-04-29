import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AppNav } from "../components/AppNav";
import { Footer } from "../components/Footer";
import { NavbarTop } from "../components/NavbarTop";
import { useSelector } from "react-redux";
import axios from "axios";
import { getDIDToken } from "../web3/magic";
import { uploadAsset } from "../web3/iphsHandler";

export const PostProject = () => {
  const user = useSelector((state) => state.login.user);
  const [asset, setAsset] = useState([]);
  const [project, setProject] = useState({
    title: "",
    description: "",
    skills: "",
    minBudget: "",
    maxBudget: "",
    category: "",
    subCategory: "",
    attachment: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const _uploadAsset = async (file) => {
    const response = await uploadAsset(file);
    console.log("Asset URI", response);
    asset.push(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle api call and submit form data
    const DIDToken = await getDIDToken();
    console.log(DIDToken);

    let bodyContent = JSON.stringify({
      title: project.title,
      desc: project.description,
      min_budget: project.minBudget,
      max_budget: project.maxBudget,
      category: project.category,
      sub_category: project.subCategory,
      skills_required: project.skills.split(/\s*,\s*/),
      attachments: asset,
    });

    const headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: "https://chaintusker-backend-wtr7x.ondigitalocean.app/create-project",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
  };

  return (
    <>
      <NavbarTop />
      <AppNav />
      <Container className="my-5 bg-custom rounded-5 py-5 px-4">
        <h2>Post a Project</h2>
        <h4>Fill in the form below to post a project for freelancers</h4>
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="projectTitleInput">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project title (max 125 characters)"
              maxLength={125}
              name="title"
              value={project.title}
              className="fs-5 py-2 bg-transparent text-light rounded-0"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectDescriptionInput">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter project description"
              name="description"
              value={project.description}
              className="fs-5 py-2 bg-transparent text-light rounded-0"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectSkillsInput">
            <Form.Label>Skills Required</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project skills (photoshop, illustrator, after effects)"
              name="skills"
              value={project.skills}
              className="fs-5 py-2 bg-transparent text-light rounded-0"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectBudgetInput">
            <Form.Label>Minimum Maximum Budget</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Enter minimum budget"
                  name="minBudget"
                  value={project.minBudget}
                  className="fs-5 py-2 bg-transparent text-light rounded-0"
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Enter maximum budget"
                  name="maxBudget"
                  value={project.maxBudget}
                  className="fs-5 py-2 bg-transparent text-light rounded-0"
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
          </Form.Group>
          <Row>
            {/* <Col>
              <Form.Group className="mb-3" controlId="projectDeadlineInput">
                <Form.Label>Select Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="deadline"
                  value={project.deadline}
                  placeholder="Enter project deadline"
                  className="fs-5 py-2 bg-transparent text-light rounded-0"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col> */}
            <Col>
              <Form.Group className="mb-3" controlId="projectCategoryInput">
                <Form.Label>Select Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={project.category}
                  placeholder="Enter project category"
                  className="fs-5 py-2 bg_plateform text-light rounded-0"
                  onChange={handleChange}
                  required
                >
                  <option value="" className="bg_plageform">
                    Select a Category
                  </option>
                  <option value="Web Development" className="bg_plageform">
                    Web Development
                  </option>
                  <option value="Mobile Development" className="bg_plageform">
                    Mobile Development
                  </option>
                  <option value="Graphics Design" className="bg_plageform">
                    Graphics Design
                  </option>
                  <option value="Content Writing" className="bg_plageform">
                    Content Writing
                  </option>
                  <option value="Video Editing" className="bg_plageform">
                    Video Editing
                  </option>
                  <option value="Audio Editing" className="bg_plageform">
                    Audio Editing
                  </option>
                  <option value="Other" className="bg_plagefor">
                    Other
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="projectSubCategoryInput">
                <Form.Label>Select Sub Category</Form.Label>
                <Form.Control
                  as="select"
                  name="subCategory"
                  value={project.subCategory}
                  placeholder="Enter project sub category"
                  className="fs-5 py-2 bg_plateform text-light rounded-0"
                  onChange={handleChange}
                  required
                >
                  <option value="" className="bg_plageform">
                    Select a Sub Category
                  </option>
                  <option value="Web Development" className="bg_plageform">
                    Web Development
                  </option>
                  <option value="Mobile Development" className="bg_plageform">
                    Mobile Development
                  </option>
                  <option value="Graphics Design" className="bg_plageform">
                    Graphics Design
                  </option>
                  <option value="Content Writing" className="bg_plageform">
                    Content Writing
                  </option>
                  <option value="Video Editing" className="bg_plageform">
                    Video Editing
                  </option>
                  <option value="Audio Editing" className="bg_plageform">
                    Audio Editing
                  </option>
                  <option value="Other" className="bg_plagefor">
                    Other
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="projectAttachmentInput">
            <Form.Label>Project Attachment</Form.Label>
            <Form.Control
              type="file"
              name="attachment"
              value={project.attachment}
              placeholder="Enter project attachment"
              className="fs-5 py-2 bg-transparent text-light rounded-0 w-auto"
              onChange={(e) => {
                _uploadAsset(e.target.files[0]);
              }}
            />
          </Form.Group>
          <Button type="submit">POST</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
};
