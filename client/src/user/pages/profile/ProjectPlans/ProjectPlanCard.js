import React, { useState } from "react";
import { Box, Stack, Typography, Button, Divider } from "@mui/material";
import { useGetProjectPlansByUserQuery } from "hooks/api-hook";
import { useSelector } from "react-redux";
import ProjectPlanModel from "./ProjectPlanModel";

const ProjectPlanCard = () => {
  const user = useSelector((state) => state.auth.user._id);
  const { data, refetch } = useGetProjectPlansByUserQuery(
    { user },
    { refetchOnMountOrArgChange: true }
  );
  const [open, setOpen] = useState(false);

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
            {open && (
              <ProjectPlanModel
                open={open}
                setOpen={setOpen}
                reqId={requestId}
                planId={_id}
              />
            )}
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
                  onClick={() => setOpen(!open)}
                  sx={{ mt: "1.5rem" }}
                  color="success"
                >
                  View Project Plan
                </Button>
              </Box>
            </Stack>
          </Box>
        ))}
    </Box>
  );
};

export default ProjectPlanCard;
