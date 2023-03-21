import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Divider, Grid, Stack, Typography, Button } from "@mui/material";

const PendingRequests = () => {
  return (
    <Box m="2rem" mr="4rem" ml="4rem">
      {" "}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <Box m="2rem">
            <Box
              m="0.3rem"
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
                    Solar Project for house
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    variant="h4"
                    color="grey"
                    mt="0.8rem"
                  >
                    Client Name
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PendingRequests;
