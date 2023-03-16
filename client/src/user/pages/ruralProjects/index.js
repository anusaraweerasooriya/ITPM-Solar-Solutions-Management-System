import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

import { useGetRuralProjectsQuery } from "hooks/api-hook";
import SlideShow from "./carousel";

const Project = ({
  _id,
  projectName,
  location,
  projectType,
  monthlyConsumption,
  gridType,
  estimInitiateDate,
  estimEndDate,
  estimTotalCost,
  imagePath,
  description,
  currentAllocation,
  status
}) => {
  return (
    <Card
      sx={{
        borderRadius: "0.55rem",
        backgroundColor: "#ffffff"
      }}>
        <CardActionArea>
          <CardMedia
            sx={{
              height: "200px"
            }}
            image={imagePath}
            title={location}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
              {projectName}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{justifyContent: "center"}}>
          <Button variant="contained" size="medium" color="error"
              sx={{
                  textTransform:"unset",
                  fontSize: "0.7rem",
                  "&:hover": {
                      cursor: "pointer",
                  },
              }}
          >
              Read more
          </Button>
        </CardActions>
    </Card>
  );

};

const RuralProjects = () => {
  const { data } = useGetRuralProjectsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px");

  return (
    <>
    <SlideShow />
    <Box m="1.5rem 2.5rem">
      {data ? (
        <Box 
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 3" }
          }}
        >
          {data.map(
            ({
              _id,
              projectName,
              location,
              projectType,
              monthlyConsumption,
              gridType,
              estimInitiateDate,
              estimEndDate,
              estimTotalCost,
              imagePath,
              description,
              currentAllocation,
              status
            }) => (
              <Project
                key={_id}
                _id={_id}
                projectName={projectName}
                location={location}
                projectType={projectType}
                monthlyConsumption={monthlyConsumption}
                gridType={gridType}
                estimInitiateDate={estimInitiateDate}
                estimEndDate={estimEndDate}
                estimTotalCost={estimTotalCost}
                imagePath={imagePath}
                description={description}
                currentAllocation={currentAllocation}
                status={status}
              />
            )
          )}
        </Box>
      ) : (
        <div justifyContent="center">No projects available</div>
      )}
    </Box>
    </>
  );
};

export default RuralProjects;
