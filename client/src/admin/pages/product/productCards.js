import React from 'react';
import { 
    Grid, 
    Card, 
    CardContent, 
    Box, 
    Typography, 
    IconButton, 
    useTheme  
} from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import LayersIcon from '@mui/icons-material/Layers';
import BarChartIcon from '@mui/icons-material/BarChart';

const cardItems = [
    {
        title: "Products",
        count: 78,
        icon: <WorkIcon />,
    },
    {
        title: "Categories",
        count: 6,
        icon: <LayersIcon />,
    },
    {
        title: "Count",
        count: 102,
        icon: <BarChartIcon />,
    }
];

const ProductCards = () => {
  return (
    <Box mt="2.5rem">
        <Grid container spacing={15}>
            {cardItems.map(({ title, count, icon }) => {
                return (
                    <Grid item xs={4}>
                        <Card sx={{ display: 'flex', borderRadius: '15px', p: '0.5rem' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', m:"0 3.5rem" }}>
                                <CardContent>
                                    <Typography component="div" variant="h5">
                                        {title}
                                    </Typography>
                                    <Typography component="div" variant="h2" m="0 20px" mt="20px">
                                        {count}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <IconButton
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: "3rem"
                                    }
                                }}
                            >
                                {icon}
                            </IconButton>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    </Box>        
  )
}

export default ProductCards;
