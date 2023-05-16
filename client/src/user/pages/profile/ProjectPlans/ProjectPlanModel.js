import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Box,
} from "@mui/material";

const ProjectPlanModel = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      fullWidth="{fullWidth}"
      maxWidth="{maxWidth}"
      open={open}
      onClose={handleClose}
    >
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
        ></Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPlanModel;
