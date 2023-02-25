import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ShowType } from "../_helpers/types";
import ProfilePagePostListComponent from "../profilePagePostListComponent/profilePagePostListComponent";
import { BoxContentCentered } from "@/styles/style";
import { useDispatch } from "react-redux";
import { BottomNavEnum, changeBottomNav } from "redux/features/bottomNav";
import { Box } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeBottomNav(BottomNavEnum.Home));
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <BoxContentCentered>
          <Typography>Posts From Users you are Following.</Typography>
        </BoxContentCentered>

        <Box sx={{ width: "100%", marginBottom: "56px" }}>
          <ProfilePagePostListComponent user_id={0} following={true} />
        </Box>
      </Container>
    </>
  );
}
