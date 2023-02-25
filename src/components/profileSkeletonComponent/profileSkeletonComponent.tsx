import { Skeleton, Typography } from "@mui/material";
import { ProfileSkeletonComponentType } from "../_helpers/types";

export default function ProfileSkeletonComponent({
  noUser,
}: ProfileSkeletonComponentType) {
  return (
    <>
      <Skeleton
        animation={noUser ? false : "pulse"}
        variant="text"
        sx={{ fontSize: "1rem" }}
        width={"95%"}
        height={80}
      />

      <Skeleton
        variant="circular"
        width={100}
        height={100}
        animation={noUser ? false : "pulse"}
      />
      <Skeleton
        animation={noUser ? false : "pulse"}
        variant="rectangular"
        width={"95%"}
        height={50}
        sx={{ my: "8px" }}
      />
      {noUser && <Typography>No User Found</Typography>}
      <Skeleton
        animation={noUser ? false : "pulse"}
        variant="rounded"
        width={"95%"}
        height={60}
        sx={{ marginBottom: 1 }}
      />
    </>
  );
}
