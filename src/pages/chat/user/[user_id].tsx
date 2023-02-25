import { Container } from "@mui/system";
import React from "react";
import { useRouter } from "next/router";
import UserChatComponent from "@/components/chat/userChat";

let socket: any;
export default function ChatUserComponent() {
  const router = useRouter();
  const user_id: number = router.query?.user_id
    ? Number(router.query?.user_id)
    : 0;

  return (
    <Container maxWidth={"xs"} sx={{ p: 0 }}>
      <UserChatComponent />
    </Container>
  );
}
