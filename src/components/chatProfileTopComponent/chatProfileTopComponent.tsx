import { Box, Card, IconButton, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";

export default function ChatProfileTopComponent({ userProfileData }: any) {
  const router = useRouter();

  return (
    <Box>
      <Card
        sx={{
          p: "5px  10px 5px 0",
          height: "50px",
          // backgroundColor: "transparent",
          // boxShadow: "rgb(40 40 40 / 33%) -2px 0px 8px 0px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Box>
            <IconButton
              onClick={() => {
                router.push("/chat");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Box>
          <Box
            onClick={() => {
              if (userProfileData.id)
                router.push(`/profile/${userProfileData.id}`);
            }}
            sx={{
              position: "relative",
              width: "50px",
              maxWidth: "60px",
              aspectRatio: "1/1",
              overflow: "hidden",
            }}
          >
            <Image
              fill
              style={{
                borderRadius: "50%",
              }}
              src={"/images/profile-img.jpeg"}
              alt="profile-image"
            ></Image>
          </Box>
          <Box
            onClick={() => {
              if (userProfileData.id)
                router.push(`/profile/${userProfileData.id}`);
            }}
            sx={{
              width: "70%",
              marginLeft: "4%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              {userProfileData.full_name}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
