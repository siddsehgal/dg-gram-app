import React, { PropsWithChildren, SetStateAction } from "react";

export enum ShowType {
  signIn = "signIn",
  signUp = "signUp",
  otp = "otp",
  updateEmail = "updateEmail",
}
export interface MiniDrawerType extends PropsWithChildren {}
