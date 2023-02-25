import { Box } from "@mui/system";
import { io } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { APICall } from "@/utils/apiCall";
import { AuthResource, ChatResource } from "@/components/_helpers/resources";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { BottomNavEnum, changeBottomNav } from "redux/features/bottomNav";
import ChatProfileTopComponent from "../chatProfileTopComponent/chatProfileTopComponent";
import ChatMessageComponent from "../chatMessageComponent/chatMessageComponent";
import ChatMessageInputComponent from "../chatMessageInputComponent/chatMessageInputComponent";
// import { ChatBackgroundImg } from "../../../public/images/chat-background-img.jpeg";
let socket: any;
export default function ChatUserComponent() {
  const { enqueueSnackbar } = useSnackbar();
  const [chatData, setChatData] = useState<any>([]);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const [users_room_id, setUsersRoomId] = useState("");
  const [userProfileData, setUserprofileData] = useState({
    id: null,
    full_name: "",
  });
  const [self_user_id, setUserId] = useState("");

  const messagesEndRef: any = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  const router = useRouter();
  const user_id: number = router.query?.user_id
    ? Number(router.query?.user_id)
    : 0;

  useEffect(() => {
    dispatch(changeBottomNav(BottomNavEnum.Hidden));
    socketInitializer();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  const socketInitializer = async () => {
    const res = await APICall({
      ...ChatResource.GetUserChatAPI,
      enqueueSnackbar,
      query: { user_id },
    });
    const {
      chats,
      users_room_id,
      user_id: req_user_id,
      userData,
    } = res.response;

    setUserprofileData(userData);

    setChatData(chats);
    setUsersRoomId(users_room_id);
    setUserId(req_user_id);

    await APICall({
      ...AuthResource.SocketAPI,
      enqueueSnackbar,
    });

    socket = io();

    socket.emit("JoinRoomWithUser", { user_id, my_id: req_user_id });

    socket.on("UserReceivedAMessage", (data: any) => {
      const { chat } = data;
      setChatData((prev: any) => [...prev, chat]);
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("UserSentAMessage", {
      my_id: self_user_id,
      user_id,
      message,
      users_room_id,
    });
    setMessage("");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 56px)",
        position: "relative",
        backgroundImage: "url('/images/chat-background-img.jpeg')",
        // zIndex: "",
      }}
    >
      <ChatProfileTopComponent userProfileData={userProfileData} />
      <Box
        sx={{
          // width: "95%",
          padding: "2%",
          // border: "1px solid black",
          // background: "pink",
          position: "absolute",
          bottom: "calc(49px)",
          right: "0",
          left: "0",
          top: "60px",
          overflowY: "scroll",
        }}
      >
        {chatData.map((chat: any, index: number) => {
          return (
            <ChatMessageComponent
              key={`Chat:${chat.id}`}
              chat={chat}
              other_user_id={user_id}
            />
          );
        })}
        <div ref={messagesEndRef}></div>
      </Box>
      <ChatMessageInputComponent
        message={message}
        setMessage={setMessage}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
