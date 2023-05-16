import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Grid, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { useGetDonationsByUserEmailQuery } from 'hooks/api-hook';
import { VolunteerActivismOutlined } from '@mui/icons-material';

const Donations = () => {
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width: 900px");
  const userEmail = useSelector((state) => state.auth.user.email);
  const {data} = useGetDonationsByUserEmailQuery({userEmail});

  const totalAmount = data ? data.reduce((total, { amount }) => total + amount, 0) : 0;

  return (
    <Box m="2rem" mr="4rem" ml="4rem">
      <Grid container spacing={2}>
        <Grid item xs={5}>
          {isNonMobileScreen && <Sidebar />}
        </Grid>
        <Grid item xs={7}>
          <Box>
            {data &&
              data.map(({ _id, fullName, email, amount, contributingProject, date }) => (
                <Box
                  key={_id}
                  m="0.3rem"
                  mb="1rem"
                  p="2rem"
                  pt="0"
                  sx={{
                    height: 100,
                    width: 700,
                    maxWidth: "100%",
                    background: "white",
                    borderRadius: "2rem",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Box m="1rem">
                      <Typography fontWeight="bold" variant="h5">
                        {contributingProject}
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        variant="h5"
                        color="#3f51b5"
                        mt="0.8rem"
                      >
                        $ {amount}
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" sx={{ mr: "2rem" }} />
                    <Box>
                      <Button
                        size="large"
                        variant="contained"
                        sx={{ mt: "1.5rem" }}
                        color="secondary"
                        onClick={() => { navigate(`/ruralProject/${_id}`); }}
                      >
                        View Project
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ))}
          </Box>


          <Typography mt="5rem" fontWeight="bold" fontSize="1.3rem" ml="16.5rem">Total Contribution</Typography>
          <Box
            m="0.3rem"
            p="2rem"
            pt="0"
            mt="0.5rem"
            sx={{
              height: 100,
              width: 700,
              maxWidth: "100%",
              background: "white",
              borderRadius: "2rem",
            }}
          >
            <Typography fontWeight="bold" variant="h1" color="#3f51b5" ml="16rem" pt="1.5rem">
              $ {totalAmount}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body1" fontSize="1.1rem" ml="1rem" color="#3f51b5">
              We appreciate your helping hand
            </Typography>
            <Box marginLeft={1}>
              <IconButton color="error" aria-label="favorite">
                <VolunteerActivismOutlined fontSize="medium" />
              </IconButton>
            </Box>
          </Box>

        </Grid>
      </Grid>
    </Box>
  )
}

export default Donations
