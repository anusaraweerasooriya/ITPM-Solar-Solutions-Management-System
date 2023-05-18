import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { positions } from "@mui/system";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { Box, CardActionArea, useMediaQuery, useTheme } from "@mui/material";
import { useGetRecentProjectsQuery } from "hooks/api-hook";

const Project = ({ _id, projectName, location, picturePath, description }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: "0.55rem",
        backgroundColor: "#ffffff",
      }}
    >
      <CardActionArea>
        <CardMedia
          sx={{
            height: "200px",
          }}
          image={`http://localhost:5001/assets/${picturePath}`}
          title={location}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight="bold"
          >
            {projectName}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {" "}
        {/*sx={{justifyContent: "center"}}*/}
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            navigate(`/project/${_id}`);
          }}
          sx={{
            textTransform: "unset",
            fontSize: "0.7rem",
            fontWeight: "bold",
            width: "8rem",
            "&:hover": {
              color: "#ffffff",
              background: "#4d547d",
            },
          }}
        >
          Read more
        </Button>
      </CardActions>
    </Card>
  );
};

export default function MediaCard() {
  const { data, refetch } = useGetRecentProjectsQuery();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 1000px");
  useEffect(() => {
    refetch();
  });

  return (
    //================= SLIDE SHOW and CARD ==================
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            height="300px"
            className="d-block w-100"
            src="https://skyelectric.com/blog/wp-content/uploads/2020/11/Misconceptions-about-solar.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2>
              <b>Projects</b>
            </h2>
            <p>
              With the huge client base we already have successfully compleated
              more than 100 projects our client's live at ease.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            height="300px"
            className="d-block w-100"
            src="https://www.globaltrademag.com/wp-content/uploads/2016/09/U.S.-COMPANIES-WERE-BLOCKED-FROM-COMPETING-FOR-A-SHARE-OF-INDIA%E2%80%99S-SOLAR-POWER-MARKET.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h2>
              <b>Projects</b>
            </h2>
            <p>
              With the huge client base we already have successfully compleated
              more than 100 projects our client's live at ease.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            height="300px"
            className="d-block w-100"
            src="https://eitrawmaterials.eu/wp-content/uploads/2021/05/solar-panels-against-mountain-landscape.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h2>
              <b>Projects</b>
            </h2>
            <p>
              With the huge client base we already have successfully compleated
              more than 100 projects our client's live at ease.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Box ml="1rem">
        <Typography variant="h3" fontWeight="bold" mt="1rem">
          Recent Projects
        </Typography>
      </Box>

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
              "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
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
                picturePath,
                description,
                currentAllocation,
                status,
              }) => (
                <Project
                  key={_id}
                  _id={_id}
                  projectName={projectName}
                  location={location}
                  picturePath={picturePath}
                  description={description}
                />
              )
            )}
          </Box>
        ) : (
          <div justifyContent="center">No projects available</div>
        )}
      </Box>
    </div>
  );
}
