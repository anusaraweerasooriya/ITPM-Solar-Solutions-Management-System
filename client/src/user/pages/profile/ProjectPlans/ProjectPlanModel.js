import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import Products from "./Products";
import {
  useGetServicePackByRequestQuery,
  useGetPendingRequestByIdQuery,
  useGetProjectPlanByIdQuery,
} from "hooks/api-hook";

const ProjectPlanModel = ({ open, setOpen, reqId, planId }) => {
  const { data: servicePack } = useGetServicePackByRequestQuery({ reqId });
  const { data: request } = useGetPendingRequestByIdQuery({ reqId });
  const { data: plan } = useGetProjectPlanByIdQuery({ planId });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog fullWidth={false} maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>Optional sizes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <Box>
            <Box
              sx={{ background: "#e9ecf7", borderRadius: "1rem", m: "0.4rem" }}
            >
              <Typography variant="h4" color="black" fontWeight="bold">
                Plan description and the procedure
              </Typography>
              <Divider />
              <Typography variant="h5" color="black" fontWeight="bold">
                {plan && plan.description}
              </Typography>
            </Box>
            <Products servicePack={servicePack && servicePack.pack} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPlanModel;
