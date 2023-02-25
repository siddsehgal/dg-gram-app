import { Box, IconButton } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

export default function ChatMessageInputComponent({
  handleFormSubmit,
  message,
  setMessage,
}: any) {
  return (
    <Box>
      <form
        action=""
        onSubmit={handleFormSubmit}
        style={{
          width: "96%",
          display: "flex",
          position: "absolute",
          bottom: "0",
          right: "0",
          // backgroundColor: "pink",
          padding: "2%",
        }}
      >
        <input
          autoFocus={true}
          style={{
            width: "100%",
            height: "25px",
            padding: "10px 20px",
            fontSize: "1.2rem",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            boxShadow: " rgb(190 190 190) 6px 6px 10px 2px",
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          placeholder="Enter a Message"
        />
        <IconButton type="submit" sx={{ width: "15%", p: "0" }}>
          <SendIcon
            sx={{
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </form>
    </Box>
  );
}
