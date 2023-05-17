import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const RejectModal = ({ reqId, isRejectModal, setIsRejectModal, refetch }) => {
  const [rejectMessage, setRejectMessage] = useState("");

  const handleClose = () => {
    setIsRejectModal(false);
  };

  const rejectRequest = async () => {
    const response = await fetch(
      `http://localhost:5001/requests/rejectPendingRequest/${reqId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectMessage }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    if (response.ok) {
      setIsRejectModal(false);
      refetch();
    }
  };

  const handleSubmit = async () => {
    try {
      await rejectRequest();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Dialog
        open={isRejectModal}
        onClose={handleClose}
        sx={{
          ".MuiPaper-root": {
            width: "600px",
          },
        }}
      >
        <DialogTitle>
          Are you sure you want to reject this message?{" "}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="rejectMessage"
            label="Reject Message"
            type="text"
            multiline={true}
            rows={4}
            fullWidth
            variant="outlined"
            value={rejectMessage}
            onChange={(e) => setRejectMessage(e.target.value)}
            sx={{ mt: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Reject</Button>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RejectModal;
