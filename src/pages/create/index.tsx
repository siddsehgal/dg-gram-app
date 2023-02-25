import * as React from "react";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import CreateComponent from "@/components/create";

export default function Search() {
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  return <CreateComponent />;
}
