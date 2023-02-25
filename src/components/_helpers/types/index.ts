import React, { SetStateAction } from "react";

// ------------- //
// AUTH TYPES //
// ------------- //

export enum ShowType {
  signIn = "signIn",
  signUp = "signUp",
  otp = "otp",
  updateEmail = "updateEmail",
  updateUserName = "updateUserName",
}
export interface SignInComponentType {
  setShow: React.Dispatch<SetStateAction<ShowType>>;
}
export interface SignUpComponentType extends SignInComponentType {}

// ------------- //
// PROFILE TYPES //
// ------------- //

export interface UpdateUserModalComponentType {
  handleClose: () => void;
  userData: any;
  setUpdateUserData: any;
}

export interface ProfileFollowButtonComponentType {
  user_id: number;
  isFollowing: boolean;
  setUpdateUserData: React.Dispatch<SetStateAction<any>>;
}

export interface ProfilePageHeaderComponentType {
  user_id: number;
  isFollowing: boolean;
  isSelfProfile: boolean;
  userData: any;
  setUpdateUserData: React.Dispatch<SetStateAction<any>>;
}

export interface ProfileSkeletonComponentType {
  noUser: boolean;
}

export interface ProfileFollowCounterComponentType {
  counts: {
    following_count: number;
    follower_count: number;
    post_count: number;
  };
}

export interface ProfilePagePostListComponentType {
  user_id: number;
  following: boolean;
}

// POST TYPES //

export interface PostTopSectionComponentType {
  post: any;
  setPosts: React.Dispatch<SetStateAction<any[]>>;
}

export interface PostLikeSectionComponentType {
  post: {
    id: number;
    is_liked: boolean;
    post_likes: number;
    createdAt: string;
  };
}

export interface PostCardComponentType extends PostTopSectionComponentType {
  // isPostPage: boolean;
}
