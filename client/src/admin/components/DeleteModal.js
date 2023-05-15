import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DeleteModal = (prop) => {
  const handleClose = () => {
    prop.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={prop.open}
        onClose={prop.setOpen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          ".MuiDialog-root": {
            opacity: 0.1,
          },
        }}
      >
        <DialogTitle fontWeight="bold">{prop.title}</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: "0.5rem" }}>{prop.body}</Box>
        </DialogContent>
        <DialogActions>
          <Button size="medium" variant="contained" color="error" onClick={prop.handleDelete}>
            Delete
          </Button>
          <Button size="medium" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteModal;
