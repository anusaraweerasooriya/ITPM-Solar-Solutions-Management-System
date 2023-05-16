import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBox from "admin/components/FlexBox";
import { useGetProductByIdQuery } from "hooks/api-hook";

const ProductCard = ({ id, qty }) => {
  const { data, refetch } = useGetProductByIdQuery({ prodId: id });

  if (data) {
    console.log(data);
  }
  return (
    <Box m="1rem">
      <FlexBox>
        {data && (
          <Box width="90px" height="90px">
            <img
              style={{ objectFit: "cover", borderRadius: "20%" }}
              width="90px"
              height="90px"
              alt="user"
              src={`http://localhost:5001/assets/${data.imagePath}`}
            />
          </Box>
        )}
        <Box m="0.5rem">
          <Typography variant="h5" color="darkgreen" fontWeight="bold">
            {qty}PCS * {data && data.productType} {data && data.productName}
          </Typography>
          <Typography variant="h5" color="darkred" fontWeight="bold">
            {qty} X {data && data.price} = Rs. {data && data.price * qty}
          </Typography>
        </Box>
      </FlexBox>
    </Box>
  );
};

export default ProductCard;
