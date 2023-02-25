import { Box, Typography } from "@mui/material";
import Image from "next/image";
import UpdateProfileIconComponent from "../updateProfileIconComponent/updateProfileIconComponent";
import ProfileFollowButtonComponent from "../profileFollowButtonComponent/profileFollowButtonComponent";
import { ProfilePageHeaderComponentType } from "../_helpers/types";

export default function ProfilePageHeaderComponent({
  user_id,
  isFollowing,
  isSelfProfile,
  userData,
  setUpdateUserData,
}: ProfilePageHeaderComponentType) {
  return (
    <>
      <Box
        sx={{
          borderRadius: "5px 5px 0 0 ",
          // border: "1px solid pink",
          height: "100px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          src={"/images/cover-img.jpeg"}
          alt="Cover-Image"
          style={{ height: "100%", width: "100%" }}
          width={100}
          height={100}
        />
      </Box>

      <Box
        sx={{
          borderRadius: "100%",
          position: "absolute",
          overflow: "hidden",
          height: "100px",
          width: "100px",
          top: "60px",
          backgroundColor: "black",
        }}
      >
        <Image src={"/images/profile-img.jpeg"} alt="Profile-Image" fill />
      </Box>

      {isSelfProfile && (
        <UpdateProfileIconComponent
          userData={userData}
          setUpdateUserData={setUpdateUserData}
        />
      )}

      <Typography marginTop={`${!isSelfProfile && "70px"}`}>
        {userData.full_name}
      </Typography>
      <Typography>@{userData.user_name}</Typography>

      {isSelfProfile || (
        <ProfileFollowButtonComponent
          user_id={user_id}
          isFollowing={isFollowing}
          setUpdateUserData={setUpdateUserData}
        />
      )}
    </>
  );
}
