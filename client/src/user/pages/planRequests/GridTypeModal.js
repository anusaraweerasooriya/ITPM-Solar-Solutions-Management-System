import React, { useState } from "react";

import {
  Box,
  Button,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import GridType from "../../assets/grid-type.png";

const GridTypeModal = () => {
  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = useState("paper");

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography fontWeight="bold" variant="h4">
            What is On-Grid or Off-Grid ?
          </Typography>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography variant="h5">
              An off-grid solar energy system is not connected to the utility
              grid, whereas an on-grid (aka grid-tied) solar energy system is
              connected to the utility grid. Whether off-grid or on-grid system
              will determine your access to electricity, what equipment is
              needed for excess production, what happens when the grid goes
              down, and how you’re billed for electricity.{" "}
            </Typography>
            <Box
              mt="1rem"
              alignContent="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                component="img"
                sx={{
                  height: "20rem",
                  width: "30rem",
                }}
                alt="The house from the offer."
                src={`${GridType}`}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            size="large"
            sx={{
              fontWeight: "bold",
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default GridTypeModal;
