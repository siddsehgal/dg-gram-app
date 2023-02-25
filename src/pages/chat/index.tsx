import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import ChatComponent from "@/components/chat";

export default function Search() {
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  return <ChatComponent />;
}
