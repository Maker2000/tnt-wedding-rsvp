import React from "react";
import { Message } from "../app/models/user";

const MessageCard = ({ message }: { message: Message }) => {
  return (
    <div className="flex flex-col">
      <div>{message.message}</div>
      <div className="text-right text-gray-500">{message.from.firstName}</div>
    </div>
  );
};

export default MessageCard;
