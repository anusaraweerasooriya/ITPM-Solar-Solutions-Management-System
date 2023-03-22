import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Divider, Grid, Stack, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetRequestByUserIdQuery } from "hooks/api-hook";

const PendingRequests = () => {
  const user = useSelector((state) => state.auth.user._id);
  const { data } = useGetRequestByUserIdQuery({ user });
  console.log(data);

  return (
    <Box m="2rem" mr="4rem" ml="4rem">
      {" "}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <Box>
            {data.map(({ _id, clientName, type, gridType }) => (
              <Box
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
                    <Typography fontWeight="bold" variant="h4">
                      {gridType} Project for {type} purposes.
                    </Typography>
                    <Typography
                      fontWeight="bold"
                      variant="h4"
                      color="grey"
                      mt="0.8rem"
                    >
                      {clientName}
                    </Typography>
                  </Box>
                  <Divider orientation="vertical" />
                  {/* <Button
                  size="small"
                  variant="contained"
                  sx={{ m: "2rem" }}
                  color="secondary"
                >
                  Update
                </Button>
                <Button>Delete</Button> */}
                </Stack>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PendingRequests;
