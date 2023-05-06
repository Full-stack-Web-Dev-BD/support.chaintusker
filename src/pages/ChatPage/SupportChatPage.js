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
import { CiMenuKebab } from "react-icons/ci";
import moment from "moment";
import { toast } from "react-toastify";
import { MdLocationPin } from "react-icons/md";

export const SupportChatPage = () => {
  // userlist sidebar toggle
  const [mobileSidebar, setMobileSidebar] = useState(true);

  // store data
  const [myConversationList, setMyConversationList] = useState([]);
  const [conversationListLoading, setConversationListLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [initialCNV, setInitialCNV] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});
  const [messageLoading, setMessageLoading] = useState(true);
  const socket = useRef();

  // temp variables
  const [msg, setMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // others
  const scrollRef = useRef();
  const address = useSelector((state) => state.login.data.publicAddress);
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [GGToken, setGGToken] = useState("");

  // screen size
  useEffect(() => {
    updateToken();
    setInterval(() => {
      updateToken();
    }, 20000);
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setMobileSidebar(false);
    } else {
      setMobileSidebar(true);
    }
  }, [address]);
  useEffect(() => {
    initializeChat();
  }, [address, conversationListLoading, ticketId]);
  const getUserInfo = async () => {
    const DIDToken = await getDIDToken();
    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    const userInfo = await axios.get(
      `${ChatBaseURL}/api/ticket/find/${ticketId}`,
      { headers: headersList }
    );
    setCurrentTicket(userInfo.data);
    await loadInitialCNV();
    await getSMSHistoryBetweenUsers(userInfo.data);
  };
  const initializeChat = async () => {
    await updateToken();
    if (address) {
      await getUserInfo();
    }
    if (myConversationList.length < 1) {
      await getMyConversationList();
    }
    setMessageLoading(false);
  };
  const getMyConversationList = async () => {
    const DIDToken = await getDIDToken();
    if (address) {
      let headersList = {
        Accept: "*/*",
        token: DIDToken,
        "Content-Type": "application/json",
      };
      // get  all my tickets as agent
      const myTicket = await axios.get(
        `${ChatBaseURL}/api/ticket/my-supporting-ticket/${address}`,
        { headers: headersList }
      );
      setMyConversationList(myTicket.data);

      const initialCNV = await axios.get(
        `${ChatBaseURL}/api/ticket/ticketInitCNV/${ticketId}`,
        { headers: headersList }
      );
      setInitialCNV(initialCNV.data);
    }
  };

  const loadInitialCNV = async () => {
    const DIDToken = await getDIDToken();
    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };

    const initialCNV = await axios.get(
      `${ChatBaseURL}/api/ticket/ticketInitCNV/${ticketId}`,
      { headers: headersList }
    );
    setInitialCNV(initialCNV.data);
  };
  const getSMSHistoryBetweenUsers = async (ticketInfo) => { 
    const DIDToken = await getDIDToken();
    if (ticketInfo.user && messages.length < 1) {
      let headersList = {
        Accept: "*/*",
        token: DIDToken,
        "Content-Type": "application/json",
      };
      await JSON.parse(localStorage.getItem("chat_user"));
      const response = await axios.post(
        `${ChatBaseURL}/api/messages/get-support-msg`,
        {
          from: address,
          to: ticketInfo.user,
        },
        { headers: headersList }
      );
      if (response.data) {
        setMessages(response.data);
      } else {
      }
    }
  };

  // update token while expired
  async function updateToken() {
    const DIDToken = await getDIDToken();
    setGGToken(DIDToken);
  }
  // init socket to - add user to socket , receive sms
  useEffect(() => {
    if (address && currentTicket) {
      console.log();
      socket.current = io(ChatBaseURL);
      socket.current.emit("add-user", address);
      socket.current.on("msg-recieve", (data) => {
        console.log(data, currentTicket);
        console.log(
          data.from.toLocaleLowerCase(),
          currentTicket.user.toLocaleLowerCase()
        );
        if (
          data.from.toLocaleLowerCase() ==
          currentTicket.user.toLocaleLowerCase()
        ) {
          setArrivalMessage({ fromSelf: false, message: data.msg });
          console.log("received workd");
        } else {
          console.log("received not workd");
        }
      });
      socket.current.on("get-ping", (data) => {
        setMyConversationList(data);
      });
    }
  }, [address, currentTicket]);

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
      setMobileSidebar(!mobileSidebar);
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
    display: mobileSidebar ? "block" : "none",
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
    } catch (error) {
      console.log(error);
    }
    setMsg("");
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendChat = async (event) => {
    if (msg.length > 0) {
      await handleSendMsg(msg);
      setMsg("");
      getMyConversationList();
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
                {myConversationList.map((ticket, index) => (
                  <div
                    className={`single_chat_user ${
                      ticket._id === ticketId ? "active_cnv_with" : ""
                    } `}
                    key={index}
                    onClick={(e) => {
                      if (ticket._id !== ticketId) {
                        setMessages([]);
                        setInitialCNV([]);
                        navigate(`/resolve-issue/${ticket._id}`);
                      }
                    }}
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
                      {/* <p> {currentTicket.timezone}  {moment( new Date().toLocaleString("en-US", { timeZone: currentTicket.timezone }), "M/D/YYYY, h:mm:ss A").format("h:mm A")} </p> */}
                    </div>
                    <span className="ch_time ml-auto"></span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col sm={8} xs={12} className="chat_message_body_wrapper">
            <div className="chat_side  template_card chatbox_height p_15">
              {ticketId ? (
                <>
                  {/* Chat header */}
                  {!messageLoading && (
                    <div className="chatbox_header ch_wrap d-flex">
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
                          <span>
                            {currentTicket.timezone ? (
                              <span>
                                <MdLocationPin /> {currentTicket.timezone}
                                {moment(
                                  new Date().toLocaleString("en-US", {
                                    timeZone: currentTicket.timezone,
                                  }),
                                  "M/D/YYYY, h:mm:ss A"
                                ).format("h:mm A")}
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Chat Body sms history */}
                  <div className="chat_sms_body pt-3">
                    {currentTicket.title ? (
                      <div className="ticket_issue mt-2 mb-5"> 
                        <h5>New Ticket Opened</h5>
                        <hr /> 
                        <p className=" mt-2"><i>Issue: {currentTicket.title}</i>  </p>
                      </div>
                    ) : (
                      ""
                    )}
                    {initialCNV.map((message, index) => (
                      <div
                        ref={scrollRef}
                        key={index}
                        className={`iq-message-body mb-3 ${
                          message.fromSelf ? "iq-current-user" : "iq-other-user"
                        }`}
                      >
                        <div className="chat-profile">
                          <div className="latterpp">
                            <span>
                              <FaUserAstronaut />
                            </span>
                          </div>
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
                              <div>
                                <p className="mr-2 mb-0">
                                  {message.message.text}{" "}
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "12px",
                                  }}
                                >
                                  {moment(message.createdAt).format("h:mm A")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {messages.map((message, index) => (
                      <div
                        ref={scrollRef}
                        key={index}
                        className={`iq-message-body mb-3 ${
                          message.fromSelf ? "iq-current-user" : "iq-other-user"
                        }`}
                      >
                        <div className="chat-profile">
                          <div className="latterpp">
                            <span>
                              <FaUserAstronaut />
                            </span>
                          </div>
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
                              <div>
                                <p className="mr-2 mb-0">{message.message}</p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "12px",
                                  }}
                                >
                                  {moment(message.createdAt).format("h:mm A")}
                                </p>
                              </div>
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
                  <>
                    {messageLoading ? (
                      <div className="select_start_chat text-center">
                        <h5>Loading...</h5>
                      </div>
                    ) : (
                      <div className="select_start_chat text-center">
                        <img src="/img/chat.png" alt="img" />
                        {myConversationList.length < 1 ? (
                          <p>You dont have any conversation yet </p>
                        ) : (
                          <p>Select a conversation and chat away.</p>
                        )}
                      </div>
                    )}
                  </>
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
