import React, { SetStateAction } from "react";

export enum ShowType {
  signIn = "signIn",
  signUp = "signUp",
  otp = "otp",
  updateEmail = "updateEmail",
}
export interface SignInType {
  setShow: React.Dispatch<SetStateAction<ShowType>>;
}
