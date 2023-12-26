import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ message }) => {
  const { auth } = useSelector((store) => store);
  const isRequestUserMessage = auth?.user?.id === message?.user?.id;
  return (
    <div
      className={` group  flex ${
        !isRequestUserMessage ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`p-1 ${
          !isRequestUserMessage
            ? "rounded-md px-5 bg-[#ebebeb]"
            : "px-5 rounded-md bg-[#3558ff] text-white"
        } `}
      >
        {message?.image && (
          <img
            className="w-[12rem] h-[17rem] object-cover rounded-md "
            src={message.image}
            alt=""
          />
        )}
        <p className={`${true ? "py-2" : "py-1"}`}>{message?.content}</p>
      </div>

      <button className="absolute top-0 right-0 hidden px-2 py-1 bg-blue-500 text-white rounded-md transition-opacity opacity-0 group-hover:opacity-100">
        Your Button
      </button>
    </div>
  );
};

export default ChatMessage;
