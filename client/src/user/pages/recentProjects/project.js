import * as React from 'react';
import { positions } from '@mui/system';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { Box,Grid,Stack,Typography,CardActions,CardContent,CardMedia,Button,Card} from '@mui/material';
import Wallpaper from "../../assets/authwallpaper.jpg";
import FlexBox from 'admin/components/FlexBox';



export default function MediaCard() {

const navigate = useNavigate();

  return (
    <div>
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                height= "300px"
                className="d-block w-100"
                src="https://skyelectric.com/blog/wp-content/uploads/2020/11/Misconceptions-about-solar.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h2><b>Projects</b></h2>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                height= "300px"
                className="d-block w-100"
                src="https://www.globaltrademag.com/wp-content/uploads/2016/09/U.S.-COMPANIES-WERE-BLOCKED-FROM-COMPETING-FOR-A-SHARE-OF-INDIA%E2%80%99S-SOLAR-POWER-MARKET.jpg"
                alt="Second slide"
                />
                <Carousel.Caption>
                <h2><b>Projects</b></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                height= "300px"
                className="d-block w-100"
                src="https://eitrawmaterials.eu/wp-content/uploads/2021/05/solar-panels-against-mountain-landscape.jpg"
                alt="Third slide"
                />
                <Carousel.Caption>
                <h2><b>Projects</b></h2>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        






        <Box >
            <Grid container spacing={2} mt="1rem" m="2rem">
                <Grid item xs={6} md={3}  
                sx={{ 
                        height:"40vh",
                        backgroundImage: `url(${Wallpaper})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                    
                </Grid>
                <Grid item xs={6} md={8}>
                    <Typography variant='h3'fontWeight="bold">
                        <u>Solar Streat Light Project, Badulla</u>
                    </Typography><br></br>
                  
                        
                    <Box>
                        <Stack direction="row" spacing={2} mt={1}>
                            <Typography variant='h5' fontWeight="bold">
                            Location :
                            </Typography>

                            <Typography variant='h5'>
                            Sri Lanaka,Badulla
                            </Typography>
                        </Stack>


                        <Stack direction="row" spacing={2} mt={1}>
                            <Typography variant='h5' fontWeight="bold">
                            Product :
                            </Typography>

                            <Typography variant='h5'>
                            X5AI-SL20-solar
                            </Typography>
                        </Stack>


                        <Stack direction="row" spacing={2} mt={1}>
                            <Typography variant='h5' fontWeight="bold">
                            Date   :
                            </Typography>

                            <Typography variant='h5'>
                            16/01/2023
                            </Typography>
                        </Stack>


                        <Stack direction="row" spacing={2} mt={1}>
                            <Typography variant='h5' fontWeight="bold">
                            Client  :
                            </Typography>

                            <Typography variant='h5'>
                            John Tan
                            </Typography>
                        </Stack>



                        <Stack direction="row" spacing={2} mt={1}>
                            <Typography variant='h5' fontWeight="bold">
                            Description :
                            </Typography>

                            <Typography variant='h5'>
                            description.........
                            </Typography>
                        </Stack>
                    </Box>
                    
                
                
                    
                </Grid>
            </Grid>
        </Box>

    </div>
  );
}









