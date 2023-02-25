import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function Search() {
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  return <></>;
}
