import React from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useGetProjectPlansByUserQuery } from "hooks/api-hook";
import { useSelector } from "react-redux";

const ProjectPlanCard = () => {
  const user = useSelector((state) => state.auth.user._id);
  const { data, refetch } = useGetProjectPlansByUserQuery(
    { user },
    { refetchOnMountOrArgChange: true }
  );
  console.log(data);

  return (
    <Box>
      {data &&
        data.map(({ _id, user, requestId }) => (
          <Box
            key={_id}
            m="0.3rem"
            mt="1rem"
            sx={{
              height: 100,
              width: 700,
              maxWidth: "100%",
              background: "white",
              borderRadius: "2rem",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Box m="1rem">
                <Typography fontWeight="bold" variant="h5">
                  Project plan for reqId : {requestId}
                </Typography>
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  color="grey"
                  mt="0.8rem"
                >
                  userID: {user}
                </Typography>
              </Box>
              <Divider orientation="vertical" sx={{ mr: "2rem" }} />
              <Box>
                <Button
                  size="large"
                  variant="contained"
                  sx={{ mt: "1.5rem" }}
                  color="success"
                  // onClick={() => setIsForm(!isForm)}
                >
                  View Project Plan
                </Button>
                {/* {isForm && (
                        <FormModal setOpen={setIsForm} open={isForm}>
                          <UpdateForm
                            reqId={_id}
                            refetch={refetch}
                            setIsForm={setIsForm}
                          />
                        </FormModal>
                      )} */}
              </Box>
            </Stack>
          </Box>
        ))}
    </Box>
  );
};

export default ProjectPlanCard;
