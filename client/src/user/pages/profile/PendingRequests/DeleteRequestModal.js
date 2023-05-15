import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const DeleteRequestModal = (prop) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    prop.setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/requests/deletePendingRequest/${prop.reqId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        prop.setOpen(false);
        prop.refetch();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={prop.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this request?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleDelete}
            variant="contained"
            sx={{
              background: "#8c0b01",
            }}
          >
            DELETE
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            color="success"
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteRequestModal;
