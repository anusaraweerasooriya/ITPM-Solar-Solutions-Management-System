import React from 'react'
import { useGetProductByIdQuery } from 'hooks/api-hook'
import { Grid, Typography } from '@mui/material';

const ProductView = ({prodId}) => {
    const {data} = useGetProductByIdQuery({prodId});
  return (
    data && (
        <Grid container>
            <Grid xs={12} textAlign="center">
                <Typography fontWeight="bold" fontSize="1rem" color="primary">{data.productName}</Typography>
                <hr></hr>
            </Grid>
            <Grid xs={12} textAlign="center">
                <Typography color="primary">{data.price}</Typography>
            </Grid>

            <Grid xs={4} mt="1rem">
                <Typography fontWeight="bold">Product Type : </Typography>
            </Grid>
            <Grid xs={8} mt="1rem">
                <Typography>{data.productType}</Typography>
            </Grid>

            <Grid xs={4} mt="1rem">
                <Typography fontWeight="bold">Desctiption : </Typography>
            </Grid>
            <Grid xs={8} mt="1rem">
                <Typography>{data.description}</Typography>
            </Grid>

            <Grid xs={4} mt="1rem">
                <Typography fontWeight="bold">Category : </Typography>
            </Grid>
            <Grid xs={8} mt="1rem">
                <Typography>{data.category}</Typography>
            </Grid>
        </Grid>
    )
  );
};

export default ProductView;
