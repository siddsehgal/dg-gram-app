import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BoxContentCentered } from "@/styles/style";
import ProfileCardComponent from "../search/profileCard";
import { Box, CircularProgress } from "@mui/material";
import { APICall } from "@/utils/apiCall";
import { ChatResource } from "../_helpers/resources";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { BottomNavEnum, changeBottomNav } from "redux/features/bottomNav";

export default function ChatComponent() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  dispatch(changeBottomNav(BottomNavEnum.Chat));

  const [users, setUsers] = React.useState<any[]>([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const res = await APICall({
      ...ChatResource.GetChatUserAPI,
      enqueueSnackbar,
    });

    const { response } = res;

    setUsers(response.users);
    setLoading(false);
  };
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ py: 2 }}>
        <BoxContentCentered>
          <Typography width={"100%"} textAlign="center" variant="h5">
            Chat
          </Typography>
          <Typography width={"100%"} textAlign="center" component={"p"}>
            Start Chatting by following a User and Click on the message button
          </Typography>
        </BoxContentCentered>

        {isLoading && (
          <BoxContentCentered>
            <CircularProgress />
          </BoxContentCentered>
        )}
        <Box>
          {users.map((item) => (
            <ProfileCardComponent key={item.id} user={item} isChat={true} />
          ))}
        </Box>
      </Container>
    </>
  );
}
