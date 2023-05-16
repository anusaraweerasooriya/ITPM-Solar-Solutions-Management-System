import React from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Sidebar";

const UserProjectPlans = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 900px");
  return (
    <Box m="2rem" mr="4rem" ml="4rem">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {isNonMobileScreen && <Sidebar />}
        </Grid>
        <Grid item xs={8}>
          <Box> ProjectPlans</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProjectPlans;
