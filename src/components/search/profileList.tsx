import * as React from "react";
import Box from "@mui/material/Box";
import ProfileCardComponent from "./profileCard";

export default function ProfileListComponent({ users }: any) {
  return (
    <>
      <Box
        className="filteredCard"
        sx={{
          marginBottom: "56px",
          height: "600px",
          overflowY: "scroll",
          padding: "2%",
          paddingTop: 0,
        }}
      >
        {users.map((user: any) => {
          return (
            <ProfileCardComponent
              key={`user_card_${user.id}`}
              user={user}
              isChat={false}
            />
          );
        })}
      </Box>
    </>
  );
}
