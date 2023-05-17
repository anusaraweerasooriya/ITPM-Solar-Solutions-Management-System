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
import FlexBox from "admin/components/FlexBox";

const ProjectPlanModel = ({ open, setOpen, reqId, planId }) => {
  const { data: servicePack } = useGetServicePackByRequestQuery({ reqId });
  const { data: request } = useGetPendingRequestByIdQuery({ reqId });
  const { data: plan } = useGetProjectPlanByIdQuery({ planId });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog fullWidth={false} maxWidth="md" open={open} onClose={handleClose}>
      <DialogContent>
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
              sx={{
                background: "",
                borderRadius: "1rem",
                m: "0.4rem",
                p: "1rem",
              }}
            >
              <Typography variant="h3" fontWeight="bold" color="#001457">
                Project Plan No : {planId}
              </Typography>
              <hr />
              <Box maxWidth="500px">
                <FlexBox minWidth="400px">
                  <Typography variant="h5" fontWeight="bold">
                    Client
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="darkblue">
                    :{request && request.clientName}
                  </Typography>
                </FlexBox>
                <FlexBox minWidth="400px">
                  <Typography variant="h5" fontWeight="bold">
                    Address
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="darkblue">
                    :{request && request.clientAddress}
                  </Typography>
                </FlexBox>
                <FlexBox minWidth="400px">
                  <Typography variant="h5" fontWeight="bold">
                    Grid-Type
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="darkblue">
                    :{request && request.gridType}
                  </Typography>
                </FlexBox>
                <FlexBox minWidth="400px">
                  <Typography variant="h5" fontWeight="bold">
                    Power Consumption
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="darkblue">
                    :{request && request.monthlyPowerConsumption}
                  </Typography>
                </FlexBox>
              </Box>
            </Box>
            <Box
              sx={{
                background: "#e9ecf7",
                borderRadius: "1rem",
                m: "0.4rem",
                p: "1rem",
              }}
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
            <hr />
            <FlexBox>
              <Box>
                <Typography variant="h5" color="black" fontWeight="bold">
                  Total Product Cost:{" "}
                  {servicePack && servicePack.pack.totalProductCost.toFixed(2)}
                </Typography>
                <Typography variant="h5" color="black" fontWeight="bold">
                  Service charge ({plan && plan.serviceCharge}%):{" "}
                  {(servicePack.pack.totalProductCost * plan.serviceCharge) /
                    100}
                </Typography>
              </Box>
              <Box
                m="1rem"
                p="1rem"
                sx={{ background: "yellow", borderRadius: "10px" }}
              >
                <Typography variant="h4" color="red" fontWeight="bold">
                  Rs.{" "}
                  {(servicePack &&
                    servicePack.pack.totalProductCost * plan &&
                    plan.serviceCharge) /
                    100 +
                    servicePack && servicePack.pack.totalProductCost}
                </Typography>
              </Box>
            </FlexBox>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPlanModel;
