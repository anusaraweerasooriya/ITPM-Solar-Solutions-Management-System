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
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { color } from 'd3-color';

const cardItems = [
    {
        title: "Total Projects",
        count: 25,
        icon: <EmojiObjectsIcon/>,
    },
    {
        title: "In Progress",
        count: 10,
        icon: <WatchLaterIcon />,
    },
    {
        title: "Completed",
        count: 5,
        icon: <EventAvailableIcon />,
    },
];

const RuralProjectCards = () => {

  return (
    <Box mt="2.5rem">
      <Grid container spacing={15}>
            {cardItems.map(({ title, count, icon }) => {
                return (
                    <Grid item xs={4}>
                        <Card 
                            sx={{ 
                                display: 'flex', 
                                borderRadius: '15px', 
                                p: '0.5rem',
                                background: "#7a7f9d"
                                //background: "linear-gradient(to right, #7a7f9d, #a6a9be)",
                            }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', m:"0 3.5rem", color: '#ffffff' }}>
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
                                        fontSize: "3rem",
                                        color: "#ffffff"
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

export default RuralProjectCards;
