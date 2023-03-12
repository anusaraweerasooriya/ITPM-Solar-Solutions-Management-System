import React from "react";
import { Box, Typography } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';

import SlideShow from "./carousel";
import DonateForm from "./donateForm";

const Donate = () => {
  return (
    <Box>
      <SlideShow />
      <DonateForm />
    </Box>
  );
};

export default Donate;