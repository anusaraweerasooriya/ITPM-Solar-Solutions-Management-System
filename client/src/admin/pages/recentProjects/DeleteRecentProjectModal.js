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

const DeleteRecentProjectModal = ({ open, setOpen, prodId, refetch }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/recentProjects/deleteRecentProject/${prodId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setOpen(false);
        refetch();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this recent project?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this
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

export default DeleteRecentProjectModal;
