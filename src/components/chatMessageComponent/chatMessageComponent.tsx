import { Box, Typography } from "@mui/material";
import React from "react";
import moment from "moment";

export default function ChatMessageComponent({ chat, other_user_id }: any) {
  return (
    <Box
      sx={{
        width: "100%",
        marginY: "1%",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: chat.from == other_user_id ? "flex_start" : "flex-end",
      }}
    >
      <Box
        sx={{
          width: "max-content",
          maxWidth: "80%",
          minWidth: "50px",
          background: "#6ebdb6",
          p: "1% 2%",
          borderRadius: "5px",
        }}
      >
        <Box sx={{ wordWrap: "break-word" }}>{chat.message}</Box>
      </Box>
      <Typography
        sx={{
          color: "#5f5f5f",
          fontSize: "0.7rem",
          fontWeight: "600",
          paddingX: "2%",
        }}
      >
        {moment(chat.createdAt).format("HH:mm")}
      </Typography>
    </Box>
  );
}
