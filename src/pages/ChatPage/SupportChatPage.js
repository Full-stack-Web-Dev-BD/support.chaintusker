import React, { useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Footer } from "../../components/Footer";
import { NavbarTop } from "../../components/NavbarTop";
import "./customChat.css";
import { MdMessage } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { ChatBaseURL } from "../../utls/constant";
import { getDIDToken } from "../../web3/magic";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

export const SupportChatPage = () => {
  const [myAllTicket, setMyAllTicket] = useState([]);
  const [showBlock, setShowBlock] = useState(true);
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [msg, setMsg] = useState("");
  const address = useSelector((state) => state.login.data.publicAddress);
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [historyLoading, setHistoryLoading] = useState(true);
  const [GGToken, setGGToken] = useState("");
  const [currentTicket, setCurrentTicket] = useState({});
  const [initialCNV, setInitialCNV] = useState([]);

  useEffect(() => {
    getTicketDetails();
  }, [address, ticketId]);

  const getTicketDetails = async () => {
    const DIDToken = await getDIDToken();
    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    var ticket;
    if (ticketId) {
      ticket = await axios.get(`${ChatBaseURL}/api/ticket/find/${ticketId}`, {
        headers: headersList,
      });
      setCurrentTicket(ticket.data);
    }
    const initialCNV = await axios.get(
      `${ChatBaseURL}/api/ticket/ticketInitCNV/${ticketId}`,
      { headers: headersList }
    );
    setInitialCNV(initialCNV.data);

    // get  all my tickets as agent
    const myTicket = await axios.get(
      `${ChatBaseURL}/api/ticket/my-supporting-ticket/${address}`,
      { headers: headersList }
    );
    if (myTicket.data.length > 0) {
      setMyAllTicket(myTicket.data);
    }
    // -------------

    setMessages([]);
    setHistoryLoading(true);
    setGGToken(DIDToken);
    console.log("fuck ticket is", ticket)
    if (address) {
      // const existContact = myAllTicket.find(
      //   (ticket) => ticket._id === ticketId
      // );
      // if (!existContact) {
      //   navigate("/resolve-issue");
      //   return;
      // }
      await JSON.parse(localStorage.getItem("chat_user"));
      const response = await axios.post(
        `${ChatBaseURL}/api/messages/get-support-msg`,
        {
          from: address,
          to: ticket.data.user,
        },
        { headers: headersList }
      );
      setMessages(response.data);
    }
    setHistoryLoading(false);
  };

  // screen size
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setShowBlock(false);
    } else {
      setShowBlock(true);
    }
  }, [address]);

  // init socket to - add user to socket , receive sms
  useEffect(() => {
    if (address) {
      socket.current = io(ChatBaseURL);
      socket.current.emit("add-user", address);
      socket.current.on("msg-recieve", (data) => {
        setArrivalMessage({ fromSelf: false, message: data });
      });
      // socket.current.on("get-ping", (data) => {
      //   console.log("getPing", data);
      // });
    }
  }, [address]);

  // select a user from leftsidebar to start conversation
  useEffect(() => {
    if (ticketId) {
      handleClick(ticketId);
    }
  }, [ticketId]);

  const handleClick = (ticketId) => {
    navigate(`/resolve-issue/${ticketId}`);
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setShowBlock(!showBlock);
    }
  };

  const isSmDevice = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      return true;
    } else {
      return false;
    }
  };

  const blockStyle = {
    display: showBlock ? "block" : "none",
  };

  const handleSendMsg = async (msg) => {
    let headersList = {
      Accept: "*/*",
      token: GGToken,
      "Content-Type": "application/json",
    };

    try {
      socket.current.emit("send-msg", {
        to: currentTicket.user,
        from: address,
        msg,
      });

      await axios.post(
        `${ChatBaseURL}/api/messages/add-support-msg`,
        {
          from: address,
          to: currentTicket.user,
          message: msg,
        },
        { headers: headersList }
      );

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
      await updateToken();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Invalid token, update and retry
        console.log("retrying the sending message ");
        await updateToken();
        headersList.token = GGToken; // Update the token in the headers
        await axios.post(
          `${ChatBaseURL}/api/messages/add-support-msg`,
          {
            from: address,
            to: currentTicket.user,
            message: msg,
          },
          { headers: headersList }
        );

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  async function updateToken() {
    const DIDToken = await getDIDToken();
    setGGToken(DIDToken);
  }

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendChat = (event) => {
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="custom_chat_page">
      <NavbarTop />
      <Container className="my-5">
        {/*  A row with search bar made using react-bootstrap and filter button */}
        <div
          className="cu_toggle"
          style={{ display: isSmDevice() ? "block" : "none" }}
        >
          <h6 onClick={handleClick}>
            <MdMessage /> Chat
          </h6>
        </div>
        <Row className="my-3 g-md-4 g-2 chat_wrapper">
          <Col style={blockStyle} sm={4} className="chat_userlist_wrapper">
            <div className="template_card chat_user_list chatbox_height ptb_30">
              <div className="ch_userlist_inner">
                {myAllTicket.map(
                  (ticket) =>
                    ticket !== address && (
                      <div
                        className={`single_chat_user ${
                          ticket._id === ticketId ? "active_cnv_with" : ""
                        } `}
                        key={ticket.user}
                        onClick={(e) =>
                          navigate(`/resolve-issue/${ticket._id}`)
                        }
                      >
                        <div className="ch_pp">
                          <div className="latterpp">
                            <span className=" ">
                              <FaUserAstronaut />
                            </span>
                          </div>
                        </div>
                        <div className="ch_user_info">
                          <div className="name_time">
                            <span className="ch_username ">
                              {ticket.user.slice(0, 7) +
                                "..." +
                                ticket.user.slice(-7)}
                            </span>
                          </div>
                          <p>9:40 PM</p>
                        </div>
                        <span className="ch_time ml-auto"></span>
                      </div>
                    )
                )}
              </div>
            </div>
          </Col>
          <Col sm={8} xs={12} className="chat_message_body_wrapper">
            <div className="chat_side  template_card chatbox_height p_15">
              {ticketId ? (
                <>
                  {/* Chat header */}
                  <div className="chatbox_header d-flex ">
                    <div className="latterpp">
                      <span className="">
                        <FaUserAstronaut />
                      </span>
                    </div>
                    <div className="ch_user_info">
                      <h5>
                        {currentTicket.user?.slice(0, 10) +
                          "..." +
                          currentTicket.user?.slice(-10)}
                      </h5>
                      <span> Local Time 12:00 PM </span>
                    </div>
                  </div>
                  {/* Chat Body sms history */}
                  <div className="chat_sms_body pt-3">
                    <p className="mt-4 mb-4 ticket_issue text-center">
                      {currentTicket.title}{" "}
                    </p>

                    {/* {initialCNV.map((message, index) => (
                      <div
                        ref={scrollRef}
                        key={index}
                        className={`iq-message-body mb-3 ${
                          message.fromSelf ? "iq-current-user" : "iq-other-user"
                        }`}
                      >
                        <div className="chat-profile">
                          {message.user !== "Alice" && (
                            <div className="latterpp">
                              <span>
                                <FaUserAstronaut />
                              </span>
                            </div>
                          )}
                          <small className="iq-chating p-0 mb-0 d-block">
                            {message.time}
                          </small>
                        </div>
                        <div className="iq-chat-text">
                          <div
                            className={`d-flex align-items-center justify-content-${
                              message.fromSelf ? "end" : "start"
                            }`}
                          >
                            <div className="iq-chating-content d-flex align-items-center ">
                              <p className="mr-2 mb-0">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))} */}

                    {messages.map((message, index) => (
                      <div
                        ref={scrollRef}
                        key={index}
                        className={`iq-message-body mb-3 ${
                          message.fromSelf ? "iq-current-user" : "iq-other-user"
                        }`}
                      >
                        <div className="chat-profile">
                          {message.user !== "Alice" && (
                            <div className="latterpp">
                              <span>
                                <FaUserAstronaut />
                              </span>
                            </div>
                          )}
                          <small className="iq-chating p-0 mb-0 d-block">
                            {message.time}
                          </small>
                        </div>
                        <div className="iq-chat-text">
                          <div
                            className={`d-flex align-items-center justify-content-${
                              message.fromSelf ? "end" : "start"
                            }`}
                          >
                            <div className="iq-chating-content d-flex align-items-center ">
                              <p className="mr-2 mb-0">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Chat Form  */}
                  <div className="ch_form_wrapper">
                    <div className="chat_sms_form">
                      <input
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendChat();
                          }
                        }}
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                        placeholder="Type a message..."
                        className="bcw ch_input form-control"
                      />
                      <span
                        className="cp"
                        onClick={(e) => {
                          sendChat();
                        }}
                      >
                        <AiOutlineSend />
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {historyLoading ? (
                    <div className="select_start_chat text-center">
                      <h5>Loading...</h5>
                    </div>
                  ) : (
                    <div className="select_start_chat text-center">
                      <img src="/img/chat.png" alt="img" />
                      {myAllTicket.length < 1 ? (
                        <p>You dont have any conversation yet </p>
                      ) : (
                        <p>Select a conversation and chat away.</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
