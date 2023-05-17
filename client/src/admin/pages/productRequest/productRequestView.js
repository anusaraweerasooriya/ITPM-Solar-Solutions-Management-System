import { Grid, Typography } from '@mui/material';
import { useGetDonationByIdQuery } from 'hooks/api-hook'
import React from 'react'

const ProductRequestView = ({productReqId}) => {
  const {data} = useGetDonationByIdQuery({productReqId});
  console.log("data",data);

  return (
    data && (
      <Grid container>
        <Grid xs={12} textAlign="center">
          <Typography fontWeight="bold" fontSize="1rem" color="primary">Product Request</Typography>
          <hr></hr>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Full Name : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.fullName}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Email : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.email}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Phone Number : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>$ {data.phone}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Related Product : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.relatedProduct}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Date :</Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.date}</Typography>
        </Grid>

      </Grid>
    )
  )
}

export default ProductRequestView
