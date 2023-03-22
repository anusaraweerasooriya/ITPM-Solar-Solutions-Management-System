import React, { useState } from 'react';
import { InputAdornment, Button, IconButton, CardActionArea, Grid, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useGetProductsQuery } from "hooks/api-hook";

const Products = ({
    _id,
    productName,
    price,
    productType,
    imagePath,
    category,
    description,
    features
}) => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

  return (
    <>
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "20px"
                }}
            >
                <input 
                id="searchInput" 
                type="text" 
                value={searchTerm}
                placeholder="  Search a Product" 
                style={{
                    width: "40%",
                    height: "55px",
                    padding: "10px",
                    border: "0px solid",
                    outline: "none",
                    boxShadow: "5px 10px 13px 2px #888888",
                    borderRadius: "30px",
                    color: "rgb(1, 1, 59)",
                    alignItems: "center"
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon 
                            style={{
                                marginLeft: "10px"
                            }}
                            />
                        </InputAdornment>
                    ),
                }}
                />
                <Button variant="contained" size="medium"
                style={{
                    width: "8%",
                    height: "45px",
                    textTransform:"unset",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    marginLeft: "20px",
                    borderRadius: "25px",
                    backgroundColor: "#357a38",
                    border: "none",
                    "&:hover": {
                        backgroundColor: "#91ff35",
                        cursor: "pointer",
                    },
                }}
                >Search</Button>
            </div>  
            <div>
                <Box flex={4} p={20} mt="2.5rem">
                    <Grid container spacing={15}>
                        <Card sx={{ maxWidth: 265, maxHeight: 420, borderRadius: "0.55rem",boxShadow: "2px -1px 18px 2px #616161"  }}>
                        <CardActionArea>
                            <Divider>
                            <CardMedia
                                sx={{
                              //      height: "200px"
                                }}
                                component="img"
                                //image={imagePath}
                                height=""
                                image="https://www.mustups.com/wp-content/webpc-passthru.php?src=https://www.mustups.com/wp-content/uploads/2018/12/PV18PRO-1-1.jpg&nocache=1"
                                alt="power inverter"
                            />
                            </Divider>
                            <CardHeader 
                                sx={{ backgroundColor: "#1a237e" }}
                                height=""
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton> 
                                }
                                title="EP1100 Pro Series High Frequency Power Inverter/Charger"
                                subheader="EP1100 Pro 1200VA/2400VA"
                            />
                            <CardContent sx={{ backgroundColor: "#1a237e" }}>
                                <Typography variant="h4" color="white" fontWeight="bold">
                                    {productName}
                                </Typography>
                                <Typography variant="h4" color="white" fontWeight="bold">
                                    {productType}
                                </Typography>
                                <Typography variant="h6" color="red" fontWeight="bold">
                                    <StarBorderIcon /> Rated Power: 720-1440W <br/>
                                    <StarBorderIcon /> Battery Voltage: 12/24VDC<br/>
                                    <StarBorderIcon /> PV Charge Current: 50A
                                </Typography>
                            </CardContent>
                        </CardActionArea>        
                            <CardActions disableSpacing sx={{ backgroundColor: "#1a237e" }}>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                        
                    </Grid>    
                    
                </Box>            
            </div>    
        </div>
    </>
    
    
  )
}

export default Products;
