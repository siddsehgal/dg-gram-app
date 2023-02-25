import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";
import { CircularProgress, TextField } from "@mui/material";
import ProfileListComponent from "./profileList";
import { BoxContentCentered } from "@/styles/style";
import { APICall } from "@/utils/apiCall";
import { UserResource } from "../_helpers/resources";
import { useDispatch } from "react-redux";
import { BottomNavEnum, changeBottomNav } from "redux/features/bottomNav";

export default function SearchComponent() {
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeBottomNav(BottomNavEnum.Search));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    searchUsersApiCall(value);
  };

  const searchUsersApiCall = async (searchTextValue: string) => {
    setLoading(true);

    const res = await APICall({
      ...UserResource.SearchUserAPI,
      enqueueSnackbar,
      query: { user_name: searchTextValue },
    });

    const { success, message, response } = res;
    if (success) {
      setUsers(response.users);
    }
    setLoading(false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ py: 2 }}>
        <Typography width={"100%"} textAlign="center" variant="h5">
          Search User
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            my: "4%",
          }}
        >
          <TextField
            id="search-text"
            // sx={{ border: "1px solid black" }}
            fullWidth
            type="text"
            placeholder="Search User"
            value={searchText}
            onChange={handleChange}
            autoFocus
            autoComplete="off"
          ></TextField>
        </Box>

        {loading && (
          <BoxContentCentered>
            <CircularProgress />
          </BoxContentCentered>
        )}

        <ProfileListComponent users={users} />
      </Container>
    </>
  );
}
