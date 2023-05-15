import React from 'react'
import { useGetRuralProjectByIdQuery } from 'hooks/api-hook'
import { Box, Grid, Typography, Button } from '@mui/material';

const RuralProjectView = ({projId}) => {
  const {data} = useGetRuralProjectByIdQuery({projId});
  return (
    data && (
      <Grid container>
        <Grid xs={12} textAlign="center">
          <Typography fontWeight="bold" fontSize="1rem" color="primary">{data.projectName}</Typography>
        </Grid>
        <Grid xs={12} textAlign="center">
          <Typography color="primary">{data.location}</Typography>
          <hr></hr>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Desctiption : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.description}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Project Type : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.projectType}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Grid Type : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.gridType}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Monthly Consumption : </Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.monthlyConsumption} units (1 unit = 1kWh)</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Total Cost Estimation :</Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>$ {data.estimTotalCost}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Current Allocation :</Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>$ {data.currentAllocation}</Typography>
        </Grid>

        <Grid xs={4} mt="1rem">
          <Typography fontWeight="bold">Initiation Date :</Typography>
        </Grid>
        <Grid xs={8} mt="1rem">
          <Typography>{data.estimInitiateDate}</Typography>
        </Grid>

        <Grid xs={4} mt="2rem">
          <Typography fontWeight="bold">Status</Typography>
        </Grid>
        <Grid xs={8} mt="1.5rem">
          <Button
            variant="contained"
            size="medium"
            sx={{
              textTransform: "unset",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "white",
              backgroundColor: "#106cc8",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#106cc8",
                cursor: "default",
              },
            }}
          >
            {data.status}
          </Button>
        </Grid>

      </Grid>
    )
  )
}

export default RuralProjectView
