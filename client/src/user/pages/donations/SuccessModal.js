import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessModal = (prop) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/donate");
  };

  return (
    <div>
      <Dialog
        open={prop.open}
        onClose={prop.setOpen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        overlayStyle={{ backgroundColor: "transparent" }}
        sx={{
          ".MuiDialog-root": {
            opacity: 0.1,
          },
        }}
      >
        <DialogTitle>{prop.title}</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: "0.5rem" }}>{prop.children}</Box>
        </DialogContent>
        <DialogActions>
          <Button size="medium" variant="outlined" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SuccessModal;