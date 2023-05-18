import React from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRuralProjectByIdQuery } from "hooks/api-hook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const RuralProject = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const projId = useParams().id;
  const { data } = useGetRuralProjectByIdQuery({ projId });
  const progress = data && (data.currentAllocation / data.estimTotalCost) * 100;
  console.log("id", projId);
  console.log("data", data);

  return (
    data && (
      <Box
        m="2rem"
        p="2rem"
        sx={{ backgroundColor: "white", borderRadius: "10px" }}
      >
        <Grid container>
          {/* left side */}
          <Grid xs={5}>
            <img
              width="600px"
              alt="user"
              src={`http://localhost:5001/assets/${data.imagePath}`}
            />

            <Box
              p="1rem"
              mt="2rem"
              width="600px"
              sx={{
                backgroundColor: "rgba(128, 128, 128, 0.5)",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Grid container>
                <Grid xs={7}>
                  <Button
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "0.8rem",
                    }}
                  >
                    {data.monthlyConsumption} units monthly consumption
                  </Button>
                </Grid>
                <Grid xs={5}>
                  <Button
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "0.8rem",
                    }}
                  >
                    {data.gridType} system
                  </Button>
                </Grid>

                {/* date titles */}
                <Grid xs={7} mt="2rem">
                  <Typography fontSize="0.8rem" fontWeight="bold">
                    From
                  </Typography>
                </Grid>
                <Grid xs={5} mt="2rem">
                  <Typography fontSize="0.8rem" fontWeight="bold">
                    To
                  </Typography>
                </Grid>

                {/* dates */}
                <Grid xs={7}>
                  <Button
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "0.8rem",
                    }}
                  >
                    {data.estimInitiateDate}
                  </Button>
                </Grid>
                <Grid xs={5}>
                  <Button
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "0.8rem",
                    }}
                  >
                    {data.estimEndDate}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* right side */}
          <Grid xs={7}>
            <Grid container>
              {/* title text */}
              <Grid xs={12} textAlign="right">
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<AccessTimeIcon />}
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
                  {data.status}
                </Button>
              </Grid>
              <Grid xs={12} textAlign="center">
                <Typography variant="h4" fontWeight="bold">
                  {" "}
                  {data.projectName}{" "}
                </Typography>
              </Grid>
              <Grid xs={12} textAlign="center" mt="0.2rem">
                <Typography variant="h5">{data.location}</Typography>
              </Grid>

              {/* Project Overview */}
              <Grid xs={12} mt="2rem">
                <Typography variant="h5" fontWeight="bold">
                  Project Overview :
                </Typography>
              </Grid>
              <Grid xs={12} mt="1rem">
                {data.description}
              </Grid>

              {/* Solution */}
              <Grid xs={12} mt="1rem">
                <Typography variant="h5" fontWeight="bold">
                  Solution :
                </Typography>
              </Grid>
              <Grid xs={12} mt="1rem">
                The X5 series PBOX product is the most stable product, with an
                all-in-two easy installation design. Protect the park
                environment as a real energy efficiency product, it also looks
                nice. Its well received by the park visitors.
              </Grid>

              {/* progress bar */}
              <Grid xs={12} mt="3rem">
                <Typography variant="h5" fontWeight="bold">
                  Fund Progress :
                </Typography>
              </Grid>
              <Grid xs={11} mt="1rem" textAlign="center">
                <BorderLinearProgress variant="determinate" value={progress} />
              </Grid>
              <Grid xs={1} mt="1rem" textAlign="center">
                {progress}%
              </Grid>

              {/* allocation titles */}
              <Grid xs={4} mt="2rem" textAlign="center">
                <Typography variant="h5" fontWeight="bold">
                  Total Estimated Cost
                </Typography>
              </Grid>
              <Grid xs={4} mt="2rem" textAlign="center">
                <Typography variant="h5" fontWeight="bold">
                  Current Allocation
                </Typography>
              </Grid>
              <Grid xs={4} mt="2rem" textAlign="center">
                <Typography variant="h5" fontWeight="bold">
                  Remaining
                </Typography>
              </Grid>

              {/* allocation amounts */}
              <Grid xs={4} mt="1rem" textAlign="center">
                <Button variant="outlined" sx={{ fontSize: "1.5rem" }}>
                  $ {data.estimTotalCost}
                </Button>
              </Grid>
              <Grid xs={4} mt="1rem" textAlign="center">
                <Button variant="outlined" sx={{ fontSize: "1.5rem" }}>
                  $ {data.currentAllocation}
                </Button>
              </Grid>
              <Grid xs={4} mt="1rem" textAlign="center">
                <Button variant="outlined" sx={{ fontSize: "1.5rem" }}>
                  $ {data.estimTotalCost - data.currentAllocation}
                </Button>
              </Grid>

              {/* donate button */}
              <Grid xs={12} mt="3rem" textAlign="center">
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<FavoriteIcon />}
                  onClick={() => {
                    navigate("/donate/submit", {
                      state: { id: data._id, name: data.projectName },
                    });
                  }}
                  sx={{
                    width: "150px",
                    textTransform: "unset",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      color: "#000000",
                      cursor: "pointer",
                      "& svg": {
                        color: "red",
                      },
                    },
                  }}
                >
                  Donate
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default RuralProject;
