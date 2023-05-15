import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBox from "admin/components/FlexBox";

const ProductCard = () => {
  return (
    <Box m="2rem">
      <FlexBox>
        <Box width="90px" height="90px">
          <img
            style={{ objectFit: "cover", borderRadius: "50%" }}
            width="100px"
            height="100px"
            alt="user"
            src="{`http://localhost:3001/assets/${image}`}"
          />
        </Box>
        <Box>
          <Typography variant="h5" color="darkgreen" fontWeight="bold">
            1PCS * PV1100 Plus Solar Inverter
          </Typography>
          <Typography variant="h5" color="darkred" fontWeight="bold">
            1 X 3000 = Rs. 3000.00
          </Typography>
        </Box>
      </FlexBox>
    </Box>
  );
};

export default ProductCard;
