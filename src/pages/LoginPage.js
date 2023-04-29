import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Footer } from "../components/Footer";
import { NavbarTop } from "../components/NavbarTop";
import { useNavigate } from "react-router-dom";
import icon from "../assets/logo-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../features/login/loginSlice";
import { useEffect } from "react";
import axios from "axios";
import { ChatBaseURL } from "../utls/constant";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.login.status);
  const dispatch = useDispatch();
  const address = useSelector((state) => state.login.data.publicAddress);
  const [isAdmin, setIsAdmin] = useState(null);
  const [error, setError] = useState('')
  useEffect(() => {
    if (loginStatus === "success") {
      if (address) {
        getIsAgentInfo();
      }
    }
  }, [loginStatus, address]);

  useEffect(() => {
    if (isAdmin === true) {
      navigate("/tickets");
    }
  }, [isAdmin]);

  const getIsAgentInfo = async () => {
    const response = await axios.get(
      `${ChatBaseURL}/api/auth/is-agent/${address}`
    );
    if (!response.data.isAgent){
      console.log("Your are not an agent")
     setError("You are not authenticated as Agent");
    }
    setIsAdmin(response.data.isAgent);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const email = e.target.loginEmail.value;
    dispatch(loginStart({ email }));
  };

  return (
    <>
      <NavbarTop />
      <Container className="bg-custom text-center loginWrapper shadow-lg">
        <img src={icon} alt="" />
        {isAdmin === false ? (
          <>
            <h3 className="mb-0">Chaintusker Support </h3>
            <small>You are not Autorized to use this plateform </small>
            <br />
            <small> [ Tips : Try with Agent Account ] </small>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Control
                  className="bg-primary text-light rounded- p-3 border-0 fw-bold fs-5 shadow"
                  type="email"
                  placeholder="email@domain.com"
                  disabled={loginStatus === "loading"}
                />
              </Form.Group>
              <Button
                className="rounded-5 px-5 py-3 mt-3 border-0 fs-5 shadow"
                variant="primary"
                type="submit"
                disabled={loginStatus === "loading"}
              >
                {loginStatus === "loading" ? "Loading..." : "Login"}
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h3 className="mb-0">Welcome back to Support </h3>
            <small>Connect your wallet to start using the platform</small>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Control
                  className="bg-primary text-light rounded- p-3 border-0 fw-bold fs-5 shadow"
                  type="email"
                  placeholder="email@domain.com"
                  disabled={loginStatus === "loading"}
                />
              </Form.Group>
              <Button
                className="rounded-5 px-5 py-3 mt-3 border-0 fs-5 shadow"
                variant="primary"
                type="submit"
                disabled={loginStatus === "loading"}
              >
                {loginStatus === "loading" ? "Loading..." : "Login"}
              </Button>
            </Form>
          </>
        )}
        {
          error && 
        <p className="mt-4"  > [ Error:  {error} ]</p>
        }
      </Container>
      <Footer />
    </>
  );
};
