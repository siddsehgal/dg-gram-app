import { APICall } from "@/utils/apiCall";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BottomNavEnum, changeBottomNav } from "redux/features/bottomNav";
import ProfileFollowCounterComponent from "../profileFollowCounterComponent/profileFollowCounterComponent";
import ProfilePageHeaderComponent from "../profilePageHeaderComponent/profilePageHeaderComponent";
import ProfilePagePostListComponent from "../profilePagePostListComponent/profilePagePostListComponent";
import ProfileSkeletonComponent from "../profileSkeletonComponent/profileSkeletonComponent";
import { UserResource } from "../_helpers/resources";

export default function Profile({ user_id }: any) {
  const [userData, setUserData] = useState<any>({});
  const [counts, setCounts] = useState({
    follower_count: 0,
    following_count: 0,
    post_count: 0,
  });
  const [noUser, setNoUser] = useState(false);
  const [isSelfProfile, setIsSelfProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [updateUserData, setUpdateUserData] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  dispatch(changeBottomNav(BottomNavEnum.Profile));

  const router = useRouter();
  useEffect(() => {
    getUserCall();
  }, [updateUserData]);
  const getUserCall = async () => {
    const res = await APICall({
      ...UserResource.GetUserAPI,
      enqueueSnackbar,
      query: { ...(user_id ? { user_id } : {}) },
    });

    const { success, message, response, errorCode }: any = res;
    if (!success && errorCode == "NO_USER_FOUND") {
      setNoUser(true);
    } else {
      setUserData(response.user);
      setIsSelfProfile(response.selfProfile);
      setIsFollowing(response.isFollowing);
      setCounts({
        follower_count: response.follower_count,
        following_count: response.following_count,
        post_count: response.post_count,
      });
      setNoUser(false);
    }
  };
  return (
    <Box>
      <Container maxWidth={"xs"} sx={{ mt: 2, mb: "65px" }}>
        {/* <Paper sx={{}}> */}
        <Box
          sx={{
            // border: "1px solid green",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!userData.full_name ? (
            <ProfileSkeletonComponent noUser={noUser} />
          ) : noUser ? (
            <ProfileSkeletonComponent noUser={noUser} />
          ) : (
            <>
              <ProfilePageHeaderComponent
                user_id={user_id}
                isFollowing={isFollowing}
                isSelfProfile={isSelfProfile}
                userData={userData}
                setUpdateUserData={setUpdateUserData}
              />
              <ProfileFollowCounterComponent counts={counts} />

              <ProfilePagePostListComponent
                user_id={user_id}
                following={false}
              />
            </>
          )}
        </Box>
        {/* </Paper> */}
      </Container>
    </Box>
  );
}
