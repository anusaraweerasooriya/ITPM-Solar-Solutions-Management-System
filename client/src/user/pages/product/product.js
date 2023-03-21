import { Grid, Typography, Box, Divider, Button, Card, CardHeader, CardContent } from '@mui/material';
import { display } from '@mui/system';
import React from 'react';


const Product = () => {
  return (
   <>
    <div style={{ marginLeft: "990px"}}>
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        <Box flex={4} p={5} mt="2.5rem" >
        <Grid container spacing={15} alignItems="" >
          <Grid item xs >
            <Typography variant="h3" fontWeight="bold">
              EP1100 Pro Series High Frequency Power Inverter/Charger
            </Typography>
          </Grid>
          <Grid ml="7.5rem">
            <Typography variant="h4" color="red" fontWeight="bold">
              EP1100 Pro 1200VA/2400VA
            </Typography>
          </Grid>
        </Grid>
        </Box>
        <Divider variant="middle" ml="15rem" color="black" />
        <Box sx={{ m: 2 }}>
          <Typography>
            EP1100 Pro 1200VA/2400VA is a modified sine wave inverter applied to TV, stereos, laptops, and desktop computers and other home appliances. 
            It will automatically switch to inverter and provide power when AC is interrupted unexpectedly.It's perfect for the user who need a simple 
            and economical inverter,with user-friendly installnation and setting.
          </Typography>
        </Box>
        <Box sx={{ mt: 3, ml: 2, mb: 1 }}>
        <Button variant="contained" size="medium"
                sx={{
                    backgroundColor: "#357a38",
                    textTransform:"unset",
                    fontSize: "0.7rem",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
            >
              Request
          </Button>
        </Box>
        </Box>
      </div>
      <div style={{ marginLeft: "965px"}}>  
        <Box flex={4} p={20} mt="2.5rem">
          <Grid container spacing={15}>
            <Card sx={{ maxWidth: 360, borderRadius: "0.55rem",boxShadow: "2px -1px 18px 2px #616161", backgroundColor: "1a237e" }}>
              <CardHeader 
                sx={{ backgroundColor: "#1a237e" }}
                height="194"
                title="EP1100 Pro Series High Frequency Power Inverter/Charger"
                subheader="EP1100 Pro 1200VA/2400VA"
              />
               <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook
                  together with your guests. Add 1 cup of frozen peas along with the mussels,
                  if you like.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </div> 
    </>
  )
}

export default Product;
