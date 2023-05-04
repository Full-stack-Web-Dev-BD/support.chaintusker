import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ChatBaseURL } from "../utls/constant";
import { useSelector } from "react-redux";
import { getDIDToken } from "../web3/magic";
import { NotFoundPage } from "../pages/NotFoundPage";

export const TicketList = () => {
  const [tickets, settickets] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [isAgent, setIsAgent] = useState(null);
  const address = useSelector((state) => state.login.data.publicAddress);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("myTickets");
  const [refrashing, setRefrashing] = useState(false)

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    if (address) {
      getUserDetails();
    }
  }, [address]);
  const getUserDetails = async () => {
    const user = await axios.get(`${ChatBaseURL}/api/auth/find/${address}`);
    console.log(user.data);
    setIsAgent(user.data.isAgent);
  };
  useEffect(() => {
    getNeedAgentTickets();
  }, []);
  useEffect(() => {
    if (address) {
      getMyTickets();
    }
  }, [address]);

  const refrashList = async () => {
    if(refrashing)return;
    setRefrashing(true)
    await getNeedAgentTickets();
    if (address) {
      await getMyTickets();
    }
    setRefrashing(false)
  };

  const getNeedAgentTickets = async () => {
    const DIDToken = await getDIDToken();
    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    const tickets = await axios.get(
      `${ChatBaseURL}/api/ticket/need-agent-ticket`,
      {
        headers: headersList,
      }
    ); 
    if (tickets.data) {
      settickets(tickets.data);
    }
  };

  const getMyTickets = async () => {
    const DIDToken = await getDIDToken();
    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    const tickets = await axios.get(
      `${ChatBaseURL}/api/ticket/my-supporting-ticket/${address}`,
      {
        headers: headersList,
      }
    );
    console.log("My Tickets", tickets.data);
    if (tickets.data) {
      setMyTickets(tickets.data);
    }
  };

  const handleRequest = async (request) => {
    const DIDToken = await getDIDToken();
    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    await axios.put(
      `${ChatBaseURL}/api/ticket/${request._id}/handle`,
      {
        agentPublicKey: address,
      },
      { headers: headersList }
    );
    getNeedAgentTickets();
    navigate(`/resolve-issue/${request._id}`);
  };
  return (
    <>
      {isAgent === null && <h4 className="text-center mt-5">Loading...</h4>}
      {isAgent === true && (
        <div className="my-5 min_height">
          <div>
            <ButtonGroup style={{ borderRadius: "0px" }}>
              <Button
                style={{
                  borderRadius: "0px",
                  color: "white",
                  backgroundColor:
                    activeButton === "myTickets" ? "#204de3" : "",
                }}
                onClick={() => handleButtonClick("myTickets")}
              >
                My Tickets [ {myTickets.length} ]
              </Button>
              <Button
                style={{
                  borderRadius: "0px",
                  color: "white",
                  backgroundColor:
                    activeButton === "needAgent" ? "#204de3" : "",
                }}
                onClick={() => handleButtonClick("needAgent")}
              >
                Need Agent [ {tickets.length} ]
              </Button>

              <Button
                style={{
                  borderRadius: "0px",
                  color: "white",
                  backgroundColor: "orange",
                }}
                onClick={() => refrashList()}
              >
                {
                  refrashing? 
                "Refrashing..":
                "Refrash List"
                }
              </Button>
            </ButtonGroup>
          </div>

          <Table
            hover
            responsive
            className="allProjectsTable rounded-3 text-light"
          >
            <thead className="shadow-lg border-0 fs-5 mb-4">
              <tr>
                <th>Ticket Title</th>
                <th>Agent </th>
                <th>
                  Status
                  {/* <select>
                    <option value={""}>Status</option>
                    <option value="Need_Agent">Need Agent</option>
                    <option value="In_Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select> */}
                </th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              {console.log(myTickets, tickets)}
              {activeButton === "myTickets" && (
                <>
                  {myTickets.map((request, index) => {
                    return (
                      <tr key={index}>
                        <td>{request.title}</td>
                        <td>
                          {!request.agent ? (
                            <img
                              style={{ width: "40px" }}
                              src="/img/bot.png"
                              alt="img"
                            />
                          ) : (
                            <img
                              style={{ width: "40px" }}
                              src="/img/support.png"
                              alt="img"
                            />
                          )}
                        </td>
                        <td>
                          <span className={`status_btn  ${request.status}`}>
                            {request.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td>
                          {!request.agent ? (
                            <Button
                              className="btn btn-primary btn_rounded text-light"
                              onClick={() => handleRequest(request)}
                            >
                              Start Solving
                            </Button>
                          ) : (
                            <>
                              {request.agent === address ? (
                                <Button
                                  className="btn btn-primary btn_rounded text-light"
                                  onClick={() =>
                                    navigate(`/resolve-issue/${request._id}`)
                                  }
                                >
                                  Open
                                </Button>
                              ) : (
                                <span></span>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {myTickets.length < 1 && (
                    <tr>
                      <td colSpan="4">
                        <h4 className="text-center mt-5">
                          No Tickets Finded -From Your List
                        </h4>
                      </td>
                    </tr>
                  )}
                </>
              )}

              {activeButton === "needAgent" && (
                <>
                  {tickets.map((request, index) => {
                    return (
                      <tr key={index}>
                        <td>{request.title}</td>
                        <td>
                          {!request.agent ? (
                            <img
                              style={{ width: "40px" }}
                              src="/img/bot.png"
                              alt="img"
                            />
                          ) : (
                            <img
                              style={{ width: "40px" }}
                              src="/img/support.png"
                              alt="img"
                            />
                          )}
                        </td>
                        <td>
                          <span className={`status_btn  ${request.status}`}>
                            {request.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td>
                          {!request.agent ? (
                            <Button
                              className="btn btn-primary btn_rounded text-light"
                              onClick={() => handleRequest(request)}
                            >
                              Start Solving
                            </Button>
                          ) : (
                            <>
                              {request.agent === address ? (
                                <Button
                                  className="btn btn-primary btn_rounded text-light"
                                  onClick={() =>
                                    navigate(`/resolve-issue/${request._id}`)
                                  }
                                >
                                  Open
                                </Button>
                              ) : (
                                <span></span>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {tickets.length < 1 && (
                    <tr>
                      <td colSpan="4">
                        <h4 className="text-center mt-5">
                          No Tickets Finded -All
                        </h4>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </Table>
        </div>
      )}
      {isAgent === false && (
        <div className="height_100vh">
          <NotFoundPage />
        </div>
      )}
    </>
  );
};
