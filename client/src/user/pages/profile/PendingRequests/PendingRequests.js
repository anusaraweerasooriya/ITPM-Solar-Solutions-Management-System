import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetRequestByUserIdQuery } from "hooks/api-hook";
import FormModal from "components/modals/FormModal";
import UpdateForm from "./UpdateForm";

const PendingRequests = () => {
  const user = useSelector((state) => state.auth.user._id);
  const { data } = useGetRequestByUserIdQuery({ user });
  const isNonMobileScreen = useMediaQuery("(min-width: 900px");
  const [isForm, setIsForm] = useState(false);

  return (
    <Box m="2rem" mr="4rem" ml="4rem">
      {isForm && (
        <FormModal setOpen={setIsForm} open={isForm}>
          <UpdateForm />
        </FormModal>
      )}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {isNonMobileScreen && <Sidebar />}
        </Grid>
        <Grid item xs={8}>
          <Box>
            {data &&
              data.map(({ _id, clientName, type, gridType }) => (
                <Box
                  key={_id}
                  m="0.3rem"
                  mt="1rem"
                  sx={{
                    height: 100,
                    width: 700,
                    maxWidth: "100%",
                    background: "white",
                    borderRadius: "2rem",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Box m="1rem">
                      <Typography fontWeight="bold" variant="h5">
                        {gridType} Project for {type} purposes.
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        variant="h5"
                        color="grey"
                        mt="0.8rem"
                      >
                        {clientName}
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" sx={{ mr: "2rem" }} />
                    <Box>
                      <Button
                        size="large"
                        variant="contained"
                        sx={{ mt: "1.5rem" }}
                        color="secondary"
                        onClick={() => setIsForm(!isForm)}
                      >
                        Update
                      </Button>
                      <Button
                        size="large"
                        variant="contained"
                        sx={{ mt: "1.5rem", ml: "1rem" }}
                        color="error"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PendingRequests;
