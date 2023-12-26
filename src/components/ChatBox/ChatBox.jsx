import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "./SearchUser";
import UserCard from "./UserCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Store/Message/message.action";
import MessageIcon from "@mui/icons-material/Message";
import { uploadToCloudnary } from "../../Utils/uploadToCloudnary";
import CloseIcon from "@mui/icons-material/Close";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, chat } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imageUrl = await uploadToCloudnary(e.target.files[0], "image");
    setSelectedImage(imageUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };

    dispatch(createMessage({ message, sendMessageToServer }));
  };

  // useEffect(() => {
  //   dispatch(getAllChats());
  //   setMessages([...messages, chat.message]);
  // }, [chat.message]);

  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {
    const sock = new SockJS("http://localhost:1303/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onError);
  }, []);

  const onConnect = () => {};

  const onError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    console.log("check info", stompClient, auth?.user, currentChat);
    if (stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceived
      );
    }
  });

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const onMessageReceived = (payload) => {
    const received = JSON.parse(payload.body);
    setMessages([...messages, received]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden ">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>

              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>

                <div className=" h-full space-y-4 mt-5 overflow-y-scroll no-scrollbar">
                  {chat.chats.map((item) => (
                    <div
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserCard user={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5 ">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://w.wallha.com/ws/14/xDowjyUW.jpg" />
                  <p>
                    {auth.user.id === currentChat.users[0].id
                      ? currentChat.users[1].fullName
                      : currentChat.users[0].fullName}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <IconButton aria-label="">
                    <AddIcCallIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => navigate(`/video-call?roomId=${currentChat?.id}`)}
                    aria-label=""
                  >
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>

              <div
                ref={chatContainerRef}
                className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5"
              >
                {messages?.map((item) => (
                  <ChatMessage message={item} />
                ))}
              </div>
              <div className="sticky bottom-0 border-l">
                {selectedImage && (
                  <div className="px-6 relative bg-white">
                    <img
                      className="w-[10rem] h-[10rem] object-cover px-2 "
                      src={selectedImage}
                    />
                    <div className="absolute top-0 right-0">
                      <Button
                        onClick={() => {
                          setSelectedImage("");
                        }}
                        variant="text"
                      >
                        <CloseIcon sx={{ color: "black" }} />
                      </Button>
                    </div>
                  </div>
                )}
                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                        setSelectedImage("");
                        e.target.value = "";
                      }
                    }}
                    className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                    type="text"
                    name=""
                    id=""
                    placeholder="Type..."
                  />

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <MessageIcon sx={{ fontSize: "16rem" }} />
              <p className="text-2xl  font-bold">No Chat Selected</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ChatBox;
