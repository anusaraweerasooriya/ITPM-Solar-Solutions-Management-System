import React from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Button, 
  useTheme, 
  Divider,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useParams, useNavigate } from "react-router-dom";
import { display } from '@mui/system';
import { useGetProductByIdQuery } from 'hooks/api-hook';

const Product = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const prodId = useParams().id;
  const {data} = useGetProductByIdQuery({prodId});
  console.log("id",prodId);
  console.log("data",data);

  return (
    data && (
      <Box m="2rem" p="2rem" sx={{backgroundColor:"white", borderRadius:"10px"}}>
        <Grid container>
          <Grid xs={5}>
            <img 
              width="600px"
              alt="user"
              src={`http://localhost:5001/assets/${data.imagePath}`}
            />
          </Grid>


          {/* right side */}
          <Grid xs={7}>
            <Grid container>

              {/* title text */}
              <Grid xs={12} textAlign="center">
                <Typography variant="h3" fontWeight="bold"> {data.productName} </Typography>
              </Grid>
              <hr></hr>
              <Grid xs={12} textAlign="center" mt="0.2rem">
                <Divider>
                  <Typography variant="h4" sx={{color: "red", fontWeight: "bold",}}>{data.productType} </Typography>
                </Divider>
              </Grid>
              
              {/* product Overview */}
              <Grid xs={12} mt="2rem">
                <Typography variant="h4" fontWeight="bold">Product Overview :</Typography>
              </Grid>
              <Grid xs={12} mt="2rem">
                <Typography variant="h4" fontFamily="Roboto">
                  {data.description}
                </Typography>
              </Grid>
              
              <Grid xs={12} textAlign="left">
              <br/>
              <Divider textAlign="left">
                  <Button
                    variant="contained"
                    size="medium"
                    startIcon={<InventoryIcon />}
                    onClick={ () => {navigate('/productRequest', { state: { id: data._id, name: data.productName } });}}
                    sx={{
                      textTransform: "unset",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      color: "white",
                      backgroundColor: "#106cc8",
                      borderRadius: "20px",
                      "&:hover": {
                        backgroundColor: "#106cc8",
                        cursor: "default",
                      },
                    }}
                  >
                    Product Request
                  </Button>
                  </Divider>
                </Grid>

                <Grid xs={12} mt="2rem">
                  <Typography variant="h4" fontWeight="bold">Features :</Typography>
                </Grid>
                <Grid xs={12} mt="2rem">
                  <Typography variant="h4" fontFamily="Roboto">
                    {data.normalVoltage}
                  </Typography>
                </Grid>
                
            </Grid>
          </Grid>
        </Grid>
      </Box> 
    )
  );
};

export default Product;
