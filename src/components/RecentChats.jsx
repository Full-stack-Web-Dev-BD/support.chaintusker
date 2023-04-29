import React from "react";
import { Col } from "react-bootstrap";
import { MdMessage } from "react-icons/md";
import { ChatCards } from "./ChatCards";

export const RecentChats = () => {
  // Array of dummy data
  const chats = [
    {
      id: 1,
      name: "Name Here",
      username: "@username",
      time: "3 Months",
      message: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: 2,
      name: "John Doe",
      username: "@johndoe",
      time: "2 Months",
      message: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: 3,
      name: "Jane Doe",
      username: "@janedoe",
      time: "1 Month",
      message: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: 4,
      name: "Human Doe",
      username: "@humandoe",
      time: "1 Week",
      message: "Lorem ipsum dolor sit amet consectetur...",
    },
  ];

  return (
    <Col>
      <div id="recentChats">
        <h2>
          Recent Chats{" "}
          <span>
            <MdMessage />
          </span>
        </h2>
        {chats.map((chat) => (
          <ChatCards key={chat.id} chat={chat} />
        ))}
      </div>
    </Col>
  );
};
