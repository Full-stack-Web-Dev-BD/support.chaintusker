import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaInbox, FaBell } from "react-icons/fa";
import whitepaper from "../assets/whitepaper.pdf";
import { useDispatch, useSelector } from "react-redux";
import { magicMumbai } from "../web3/magic";
import axios from "axios";
import { ChatBaseURL } from "../utls/constant";

export const NavbarTop = () => {
  const dispatch = useDispatch();
  // Fetch login status from redux store
  const loginStatus = useSelector((state) => state.login.status);
  // this is temporary until proposal  section  finishes
  const address = useSelector((state) => state.login.data.publicAddress);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (loginStatus === "success") {
      if (address) {
        getIsAgentInfo();
      }
    }
  }, [loginStatus, address]);
  const getIsAgentInfo = async () => {
    const response = await axios.get(`${ChatBaseURL}/api/auth/find/${address}`);
    setIsAdmin(response.data?.isAgent);
  };
  useEffect(() => {
    if (address) {
      // registerUser();
    }
  }, [address]);
  const registerUser = async () => {
    axios.post(`${ChatBaseURL}/api/auth/register-agent`, {
      publicKey: address,
    });
  };
  const logoutMagic = async () => {
    try {
      await magicMumbai.user.logout();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="transparent" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="150px"
            height="auto"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {loginStatus === "success" && isAdmin === true ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> 
              <Nav.Link as={Link} to="/tickets">
                Tickets
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          ""
        )}

        {loginStatus === "success" && isAdmin === true ? (
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle bg-transparent border-0 px-1"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
              id="dropdown-basic"
            >
              <img
                src="https://images.unsplash.com/photo-1678212352260-5c72115ac9b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                style={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "50%",
                }}
                alt=""
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link to="/profile/1" className="dropdown-item">
                  Profile
                </Link> 
              </li>
              <li onClick={logoutMagic}>
                <button className="dropdown-item">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </Container>
    </Navbar>
  );
};
