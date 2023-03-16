import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
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

  const isNonMobile = useMediaQuery("(min-width: 1000px");

  return (
    <>
    <SlideShow />
    <Box m="1.5rem 2.5rem">
      {data ? (
        <Box 
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 3" }
          }}
        >
          <div></div>
        </Box>
      ) : (
        <></>
      )}
    </Box>
    </>
  );
};

export default Donate;
