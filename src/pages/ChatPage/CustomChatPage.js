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

export const CustomChatPage = () => {
  const [contacts, setContacts] = useState([]);
  const [showBlock, setShowBlock] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [msg, setMsg] = useState("");
  const [selfData, setSelfData] = useState({});
  const address = useSelector((state) => state.login.data.publicAddress);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setShowBlock(false);
    } else {
      setShowBlock(true);
    }
    initChat();
  }, []);

  useEffect(() => {
    if (currentChat) {
      getHistory();
    }
  }, [currentChat]);
  const getHistory = async () => {
    const DIDToken = await getDIDToken();

    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${ChatBaseURL}/api/messages/getmsg`,
      {
        from: address,
        to: currentChat?.publicKey,
      },
      { headers: headersList }
    );
    setMessages(response.data);
  };

  const initChat = async () => {
    const DIDToken = await getDIDToken();

    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    const userData = await axios.get(`${ChatBaseURL}/api/auth/allusers`, {
      headers: headersList,
    });
    setContacts(userData.data);
    const chatUser = await JSON.parse(localStorage.getItem("chat_user"));
    setSelfData(chatUser);
  };
  useEffect(() => {
    if (selfData) {
      socket.current = io(ChatBaseURL);
      socket.current.emit("add-user", address); 
      socket.current.on("msg-recieve", (data) => {
        setArrivalMessage({ fromSelf: false, message: data });
      });
    }
  }, [selfData]);
  const handleClick = (user) => {
    setCurrentChat(user);
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
    socket.current.emit("send-msg", {
      to: currentChat.publicKey,
      from: address,
      msg,
    });

    const DIDToken = await getDIDToken();

    let headersList = {
      Accept: "*/*",
      token: DIDToken,
      "Content-Type": "application/json",
    };
    await axios.post(
      `${ChatBaseURL}/api/messages/addmsg`,
      {
        from: address,
        to: currentChat.publicKey,
        message: msg,
      },
      { headers: headersList }
    );

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

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
            {" "}
            <MdMessage /> Chat{" "}
          </h6>
        </div>
        <Row className="my-3 g-md-4 g-2 chat_wrapper">
          <Col style={blockStyle} sm={4} className="chat_userlist_wrapper">
            <div className="template_card chat_user_list chatbox_height ptb_30">
              <div className="ch_userlist_inner">
                {contacts.map(
                  (user) =>
                    user.publicKey !== address && (
                      <div
                        className="single_chat_user"
                        key={user.publicKey}
                        onClick={(e) => handleClick(user)}
                      >
                        <div className="ch_pp">
                          <div className="latterpp">
                            <span className=" ">
                              
                            {user.publicKey.slice(0, 1) +
                                  "x" +
                                  user.publicKey.slice(-1)}
                            </span>
                          </div>
                        </div>
                        <div className="ch_user_info">
                          <div className="name_time">
                            <span className="ch_username ">
                              {user.publicKey.slice(0, 7) +
                                "..." +
                                user.publicKey.slice(-7)}
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
              {currentChat ? (
                <>
                  {/* Chat header */}
                  <div className="chatbox_header d-flex ">
                    <div className="latterpp">
                      <span className="">
                        {currentChat?.publicKey?.slice(0, 1) +
                          "x" +
                          currentChat?.publicKey?.slice(-1)}
                      </span>
                    </div>
                    <div className="ch_user_info">
                      <h5>
                        {currentChat?.publicKey?.slice(0, 10) +
                          "..." +
                          currentChat?.publicKey?.slice(-10)}
                      </h5>
                      <span> Local Time 12:00 PM </span>
                    </div>
                  </div>
                  {/* Chat Body sms history */}
                  <div className="chat_sms_body pt-3">
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
                              <span>AH</span>
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
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                        placeholder="Type a message..."
                        className="ch_input form-control"
                      />
                      <Button
                        onClick={(e) => sendChat()}
                        className="text-light"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="select_start_chat text-center">
                  <img src="/img/chat.png" alt="img" />
                  <p>Select a conversation and chat away.</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
