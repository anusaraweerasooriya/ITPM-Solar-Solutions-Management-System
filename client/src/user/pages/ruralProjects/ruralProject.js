import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { useParams, useNavigate } from "react-router-dom";
import { useGetRuralProjectByIdQuery } from 'hooks/api-hook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const RuralProject = () => {
  const navigate = useNavigate();
  const projId = useParams().id;
  const {data} = useGetRuralProjectByIdQuery({projId});
  const progress = data && ((data.currentAllocation / data.estimTotalCost) * 100);
  console.log(data)
  console.log("progress", progress)

  return (
    data && (
      <Box m="2rem" p="2rem" sx={{backgroundColor:"white", borderRadius:"10px"}}>  
        <Grid container>

          {/* left side */}
          <Grid xs={5}>
              <img
                width="700px"
                alt="user"
                src={`http://localhost:5001/assets/${data.imagePath}`}
              />

              <Box p="1rem" mt="2rem" width="700px" sx={{border: "0.5px solid black"}}>
                <Grid container>
                  <Grid xs={12}>
                    <Button variant="outlined">{data.monthlyConsumption} units monthly consumption</Button>
                  </Grid>
                  <Grid xs={12} mt="2rem">
                    <Button variant="outlined">{data.gridType} system</Button>
                  </Grid>

                  {/* date titles */}
                  <Grid xs={6} mt="2rem">
                    From
                  </Grid>
                  <Grid xs={6} mt="2rem">
                    To
                  </Grid>

                  {/* dates */}
                  <Grid xs={6}>
                    <Button variant="outlined">{data.estimInitiateDate}</Button>
                  </Grid>
                  <Grid xs={6}>
                    <Button variant="outlined">{data.estimEndDate}</Button>
                  </Grid>
                </Grid>
              </Box>

          </Grid>

          {/* right side */}
          <Grid xs={7}>
              <Grid container>

                {/* title text */}
                <Grid xs={10} textAlign="center" fontWeight="bold">
                  {data.projectName}
                </Grid>
                <Grid xs={10} textAlign="center">
                  {data.location}
                </Grid>
                <Grid xs={2}>
                  <Button
                    variant="contained"
                    size="medium"
                    startIcon={<AccessTimeIcon />}
                    sx={{
                      textTransform: "unset",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      color: "white",
                      backgroundColor: "#106cc8",
                      borderRadius: "20px",
                    }}
                  >
                    {data.status}
                  </Button>
                </Grid>

                {/* Project Overview */}
                <Grid xs={12} mt="2rem" fontWeight="bold">
                  Project Overview
                </Grid>
                <Grid xs={12} mt="1rem">
                  {data.description}
                </Grid>

                {/* Solution */}
                <Grid xs={12} mt="1rem" fontWeight="bold">
                  Solution
                </Grid>
                <Grid xs={12} mt="1rem">
                  solution paragraph
                </Grid>

                {/* progress bar */}
                <Grid xs={12} mt="4rem" textAlign="center">
                  <BorderLinearProgress variant="determinate" value={progress} /> 
                  {progress}%
                </Grid>

                {/* allocation titles */}
                <Grid xs={4} mt="1rem" textAlign="center" fontWeight="bold">
                  Total Estimated Cost
                </Grid>
                <Grid xs={4} mt="1rem" textAlign="center" fontWeight="bold">
                  Current Allocation
                </Grid>
                <Grid xs={4} mt="1rem" textAlign="center" fontWeight="bold">
                  Remaining
                </Grid>

                {/* allocation amounts */}
                <Grid xs={4} mt="1rem" textAlign="center">
                  <Button variant="outlined">$ {data.estimTotalCost}</Button>
                </Grid>
                <Grid xs={4} mt="1rem" textAlign="center">
                  <Button variant="outlined">$ {data.currentAllocation}</Button>
                </Grid>
                <Grid xs={4} mt="1rem" textAlign="center">
                  <Button variant="outlined">$ {data.estimTotalCost - data.currentAllocation}</Button>
                </Grid>

                {/* donate button */}
                <Grid xs={12} mt="3rem" textAlign="center">
                  <Button
                    variant="contained"
                    size="medium"
                    startIcon={<FavoriteIcon />}
                    onClick={ () => {navigate('/donate/submit', { state: { id: data._id, name: data.projectName } });}}
                    sx={{
                      width:"150px",
                      textTransform: "unset",
                      fontSize: "0.9rem",
                      color: "white",
                      backgroundColor: "red",
                      borderRadius: "20px",
                      "&:hover": {
                        //backgroundColor: theme.palette.secondary[300],
                        cursor: "pointer",
                      },
                    }}
                  >
                    Donate
                  </Button>
                </Grid>    

              </Grid>
          </Grid>

        </Grid> 
      </Box>
    )
  );
}

export default RuralProject;

