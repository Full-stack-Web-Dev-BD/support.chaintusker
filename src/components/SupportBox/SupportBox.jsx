import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./supportBox.css";
import { useRef } from "react";
import { FiSend } from "react-icons/fi";
import { GiCrossMark } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChatBaseURL } from "../../utls/constant";
import TicketModal from "./TicketModal";
import { io } from "socket.io-client";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { getDIDToken } from "../../web3/magic";

const SupportBox = () => {
  const loginStatus = useSelector((state) => state.login.status);
  const [SCOpen, setSCOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [ticket, setTicket] = useState(null);
  const sc_scrollRef = useRef();
  const address = useSelector((state) => state.login.data.publicAddress);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [msg, setMsg] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const socket = useRef();
  const [ticketInitCnv, setTicketInitCnv] = useState([]);
  const [GGToken, setGGToken] = useState("");

  async function updateToken() {
    const DIDToken = await getDIDToken();
    setGGToken(DIDToken);
  }
  useEffect(() => {
    if (address) {
      socket.current = io(ChatBaseURL);
      socket.current.emit("add-user", address);
      socket.current.on("msg-recieve", (data) => {
        setArrivalMessage({ fromSelf: false, message: data });
      });
    }
  }, [ticket]);

  useEffect(() => {
    getHistory();
  }, [currentChat, ticket]);

  const getHistory = async () => {
    await updateToken();

    if (ticket) {
      let headersList = {
        Accept: "*/*",
        token: DIDToken,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${ChatBaseURL}/api/messages/getmsg`,
        {
          from: address,
          to: ticket.agent,
        },
        { headers: headersList }
      );
      console.log("hie  die ", response.data);
      setMessages(response.data);
    }
  };

  const handleSendMsg = async (msg) => {
    console.log("ticketis ", ticket);
    if (ticket.agent) {
      console.log("agent exist");
      socket.current.emit("send-msg", {
        to: ticket.agent,
        from: address,
        msg,
      });
    } else {
      socket.current.emit("send-msg", {
        to: ticket._id,
        from: address,
        msg,
      });
    }
    let headersList = {
      Accept: "*/*",
      token: GGToken,
      "Content-Type": "application/json",
    };
    try {
      await axios.post(
        `${ChatBaseURL}/api/messages/addmsg`,
        {
          from: address,
          to: ticket.agent ? ticket.agent : ticket._id,
          message: msg,
        },
        { headers: headersList }
      );

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await updateToken();
        await axios.post(
          `${ChatBaseURL}/api/messages/addmsg`,
          {
            from: address,
            to: ticket.agent ? ticket.agent : ticket._id,
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

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const sendChat = (event) => {
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  useEffect(() => {
    getTicket();
  }, [arrivalMessage]);

  const getTicket = async () => {
    if (address) {
      const DIDToken = await getDIDToken();

      let headersList = {
        Accept: "*/*",
        token: DIDToken,
        "Content-Type": "application/json",
      };
      const ticket = await axios.get(`${ChatBaseURL}/api/ticket/${address}`, {
        headers: headersList,
      });
      setTicket(ticket.data);

      const initialCNV = await axios.get(
        `${ChatBaseURL}/api/ticket/ticketInitCNV/${ticket.data?._id}`,
        { headers: headersList }
      );
      setTicketInitCnv(initialCNV.data);
    }
  };
  return (
    <div className="support_content">
      {SCOpen && (
        <div className="sc_box">
          <div className="sc_header d-flex">
            <div className="sc_user">
              <img src="/img/support.png" alt="img" />
            </div>
            <div>
              <h5>Agent</h5>
              <h6>Chaintusker Support</h6>
            </div>
            <span onClick={(e) => setSCOpen(!SCOpen)} className="ml-auto cp">
              <GiCrossMark />
            </span>
          </div>
          <div className="sc_sms_box">
            {loginStatus === "success" ? (
              <>
                {ticket ? (
                  <>
                    <p className="ticket_issue">
                      {" "}
                      <AiOutlineIssuesClose /> {ticket?.title}{" "}
                    </p>
                    {ticketInitCnv.map((msg, index) => (
                      <div className="iq-message-body mb-3 iq-current-user ">
                        <div className="iq-chat-text">
                          <div className="d-flex align-items-center justify-content-end">
                            <div className="iq-chating-content sc_sms_content d-flex align-items-center current_ser_sc">
                              <p className="mr-2 mb-0"> {msg.message.text} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {messages.map((message, index) => (
                      <div
                        ref={sc_scrollRef}
                        key={index}
                        className={`iq-message-body mb-3 ${
                          message.fromSelf
                            ? "iq-current-user "
                            : "iq-other-user"
                        }`}
                      >
                        {!message.fromSelf && (
                          <div className="chat-profile">
                            {message.user !== "buyer" && (
                              <div className="latterpp">
                                <span className="">
                                  {ticket.user.slice(0, 1) +
                                    "x" +
                                    ticket.user.slice(-1)}
                                </span>
                              </div>
                            )}
                            <small className="iq-chating p-0 mb-0 d-block">
                              {message.time}
                            </small>
                          </div>
                        )}
                        <div className="iq-chat-text">
                          <div
                            className={`d-flex align-items-center justify-content-${
                              message.fromSelf ? "end" : "start"
                            }`}
                          >
                            <div
                              className={`iq-chating-content sc_sms_content d-flex align-items-center ${
                                message.fromSelf ? "current_ser_sc" : ""
                              }`}
                            >
                              <p className="mr-2 mb-0">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="sc_login">
                    <TicketModal publicKey={address} getTicket={getTicket} />
                  </div>
                )}
              </>
            ) : (
              <div className="sc_login">
                <p>Login required to talk with support </p>
                <Link to={"/login"}>
                  <Button className="s_toggle btn_rounded cp">Login </Button>
                </Link>
              </div>
            )}
          </div>
          {ticket && (
            <div className="sc_form">
              <input
                className="form-control"
                placeholder="Type a message ..."
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
              <FiSend className="cp" onClick={(e) => sendChat()} />
            </div>
          )}
        </div>
      )}
      {!SCOpen && (
        <Button
          onClick={(e) => setSCOpen(!SCOpen)}
          className="s_toggle btn_rounded cp"
        >
          <img src="/img/support.png" alt="img" />
          <span>Get Support</span>
        </Button>
      )}
    </div>
  );
};

export default SupportBox;
