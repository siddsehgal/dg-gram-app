import { Chat } from "@/server/database/model";
import { withProtected } from "@/server/middleware/withProtected";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

async function SocketHandler(req: NextApiRequest, res: any) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Connected: ", socket.id);

      socket.on("JoinRoomWithUser", (data) => {
        console.log("JoinRoomWithUser");
        const { user_id, my_id } = data;
        const room = getUsersRoom([user_id, my_id]);
        socket.join(room);
      });

      socket.on("UserSentAMessage", async (data) => {
        console.log("UserSentAMessage");
        const { user_id, message, users_room_id, my_id } = data;
        const room = getUsersRoom([user_id, my_id]);

        const chat = await saveMessage({ from: my_id, message, users_room_id });

        io.to(room).emit("UserReceivedAMessage", { chat });
      });
    });
  }
  res.end();
}

export async function saveMessage(data: {
  from: number;
  message: string;
  users_room_id: number;
}) {
  const { from, message, users_room_id } = data;
  return await Chat.create({ message, from, room_id: users_room_id });
}
export function getUsersRoom(arr: number[]) {
  const users = arr.sort((a, b) => a - b);
  return users.join(",");
}
export default withProtected(SocketHandler);
