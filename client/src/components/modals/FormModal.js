import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const FormModal = (prop) => {
  const handleClose = () => {
    prop.setOpen(false);
  };

  return (
    <div>
      <Dialog open={prop.open} onClose={prop.setOpen}>
        <DialogTitle fontWeight="bold">{prop.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: "0.5rem" }}>{prop.children}</Box>
        </DialogContent>
        <DialogActions>
          <Button size="medium" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FormModal;
