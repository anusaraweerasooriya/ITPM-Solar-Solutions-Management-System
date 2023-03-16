import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

import { useGetRuralProjectsQuery } from "hooks/api-hook";
import SlideShow from "./carousel";
import DonateForm from "./donateForm";

const Donate = () => {
  const { data } = useGetRuralProjectsQuery();

  console.log(data);

  return (
    <Box>
      <SlideShow />
      <DonateForm />
    </Box>
  );
};

export default Donate;
