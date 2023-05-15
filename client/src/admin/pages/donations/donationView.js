import { Grid, Typography } from '@mui/material';
import { useGetDonationByIdQuery } from 'hooks/api-hook'
import React from 'react'

const DonationView = ({donateId}) => {
  const {data} = useGetDonationByIdQuery({donateId});
  console.log("data",data);

  return (
    data && (
      <Grid container>
        <Grid xs={12} textAlign="center">
          <Typography fontWeight="bold" fontSize="1rem" color="primary">Donation</Typography>
          <hr></hr>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Donor Name : </Typography>
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
          <Typography fontWeight="bold">Contributing Project : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.contributingProject}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Amount : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>$ {data.amount}</Typography>
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

export default DonationView
