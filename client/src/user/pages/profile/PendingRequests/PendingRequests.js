import React, { useState, useEffect } from "react";
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
import DeleteRequestModal from "./DeleteRequestModal";

const PendingRequests = () => {
  const user = useSelector((state) => state.auth.user._id);
  const { refetch, data } = useGetRequestByUserIdQuery(
    { user },
    { refetchOnMountOrArgChange: true }
  );
  const isNonMobileScreen = useMediaQuery("(min-width: 900px");
  const [isForm, setIsForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    refetch();
  });

  return (
    <Box m="2rem" mr="4rem" ml="4rem">
      {isForm && (
        <FormModal setOpen={setIsForm} open={isForm}>
          <UpdateForm />
        </FormModal>
      )}
      <Grid container spacing={2}>
        <Grid item xs={5}>
          {isNonMobileScreen && <Sidebar />}
        </Grid>
        <Grid item xs={7}>
          <Box>
            {data &&
              data.map(({ _id, clientName, type, gridType }) => (
                <Box
                  key={_id}
                  m="0.3rem"
                  mb="1rem"
                  p="2rem"
                  pt="0"
                  sx={{
                    height: 100,
                    width: 700,
                    maxWidth: "100%",
                    background: "white",
                    borderRadius: "2rem",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
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
                      {isForm && (
                        <FormModal setOpen={setIsForm} open={isForm}>
                          <UpdateForm
                            reqId={_id}
                            refetch={refetch}
                            setIsForm={setIsForm}
                          />
                        </FormModal>
                      )}
                      <Button
                        size="large"
                        variant="contained"
                        sx={{ mt: "1.5rem", ml: "1rem" }}
                        color="error"
                        onClick={() => setIsDelete(!isDelete)}
                      >
                        Delete
                      </Button>
                      {isDelete && (
                        <DeleteRequestModal
                          reqId={_id}
                          setOpen={setIsDelete}
                          open={isDelete}
                          refetch={refetch}
                        />
                      )}
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
