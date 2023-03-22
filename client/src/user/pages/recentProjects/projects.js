
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { positions } from '@mui/system';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';


export default function MediaCard() {

const navigate = useNavigate();

  return (
//================= SLIDE SHOW and CARD ==================
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


        <Box ml="1rem">
            <Typography variant='h3'fontWeight="bold">
                Recent Projects
            </Typography>
            With the huge client base we already have successfully compleated more than 100 projects our client's live at ease.
        </Box>
        






        <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center',alignItems:'center',paddingTop:10}}>

            <Card sx={{ maxWidth: 400, marginRight:4 }}>
            <CardMedia
                sx={{ height: 150 }}
                image="https://static.dw.com/image/58854115_905.jpg" alt="Card image cap"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                <b>Solar Light For Residential Area </b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant="contained" onClick={() => navigate("/project") }>
                Read More
            </Button>
            </CardActions>
            </Card>


            
            <Card sx={{ maxWidth: 400,marginRight:4 }}>
            <CardMedia
                sx={{ height: 150 }}
                image="https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                <b>Solar Streat Light project, Badulla</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant="contained" onClick={() => navigate("/project") }>
                Read More
            </Button>
            </CardActions>
            </Card>


            <Card sx={{ maxWidth: 400,marginRight:4 }}>
            <CardMedia
                sx={{ height: 150 }}
                image="https://www.energyacuity.com/wp-content/uploads/2019/09/1-NextEra-Energy-Resources-header-image-Top-Sustainable-Energy-Providers.jpg" alt="Card image cap"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                <b>Solar Light For Park</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant="contained" onClick={() => navigate("/project") }>
                Read More
            </Button>
            </CardActions>
            </Card>

        </div>

    </div>
  );
}









