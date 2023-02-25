import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProfileCardComponent({ user, isChat }: any) {
  const router = useRouter();

  return (
    <>
      <Card
        sx={{ p: "5px 10px", my: 2 }}
        style={{ boxShadow: "rgb(40 40 40 / 33%) -2px 0px 8px 0px" }}
        onClick={() => {
          router.push(isChat ? `/chat/user/${user.id}` : `/profile/${user.id}`);
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "30%",
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
              {user.full_name}
            </Typography>
            <Typography>
              {!isChat ? `@${user.user_name}` : user.message}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
}
