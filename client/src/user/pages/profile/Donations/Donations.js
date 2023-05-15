import { Box, Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import Sidebar from 'admin/components/Sidebar';
import { useGetDonationsByUserEmailQuery } from 'hooks/api-hook';
import React from 'react'
import { useSelector } from "react-redux";

const Donations = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 900px");
  const userEmail = useSelector((state) => state.auth.user.email);
  const {data} = useGetDonationsByUserEmailQuery({userEmail});
  console.log("data", data);

  return (
    <Box m="2rem" mr="4rem" ml="4rem">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {isNonMobileScreen && <Sidebar />}
        </Grid>
        <Grid item xs={8}>
          <Box>
            {data &&
              data.map(({ _id, fullName, email, amount, contributingProject, date }) => (
                <Box
                  key={_id}
                  m="0.3rem"
                  mt="1rem"
                  sx={{
                    height: 100,
                    width: 700,
                    maxWidth: "100%",
                    background: "white",
                    borderRadius: "2rem",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Box m="1rem">
                      <Typography fontWeight="bold" variant="h5">
                        {contributingProject}
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        variant="h5"
                        color="grey"
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
                        //onClick={}
                      >
                        View
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Donations
