import * as React from "react";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import VolunteerActivismOutlined from "@mui/icons-material/VolunteerActivismOutlined";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ width: 450, height: 600, maxWidth: "100%", borderRadius: "2rem" }}
    >
      <Divider />
      <Box m="2rem">
        <Typography variant="h3" fontWeight="bold" sx={{ mt: "2rem" }}>
          Profile
        </Typography>
      </Box>

      <Divider
        sx={{
          background: "grey",
        }}
      />
      <MenuList>
        <MenuItem
          sx={{ m: "2rem" }}
          onClick={() => navigate("/profile/pendingRequests")}
        >
          <PendingActionsIcon fontSize="large" sx={{ mr: "1rem" }}>
            <ContentCut fontSize="small" />
          </PendingActionsIcon>
          <ListItemText>
            <Typography variant="h5">Pending Requests</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem
          sx={{ m: "2rem" }}
          onClick={() => {
            navigate("/profile/projectPlans");
          }}
        >
          <PendingActionsIcon fontSize="large" sx={{ mr: "1rem" }}>
            <ContentCut fontSize="small" />
          </PendingActionsIcon>
          <ListItemText>
            <Typography variant="h5">Project Plans</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem sx={{ m: "2rem" }}>
          <ContactMailOutlinedIcon fontSize="large" sx={{ mr: "1rem" }}>
            <ContentCopy fontSize="small" />
          </ContactMailOutlinedIcon>
          <ListItemText>
            <Typography variant="h5">Requests</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem sx={{ m: "2rem" }}>
          <NoteAltOutlinedIcon fontSize="large" sx={{ mr: "1rem" }}>
            <ContentPaste fontSize="small" />
          </NoteAltOutlinedIcon>
          <ListItemText>
            <Typography variant="h5">Ongoing Projects</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem
          sx={{ m: "2rem" }}
          onClick={() => {
            navigate("/profile/donations");
          }}
        >
          <VolunteerActivismOutlined fontSize="large" sx={{ mr: "1rem" }}>
            <Cloud fontSize="small" />
          </VolunteerActivismOutlined>
          <ListItemText>
            <Typography variant="h5">Donations</Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ m: "2rem" }}>
          <AccountCircleOutlinedIcon fontSize="large" sx={{ mr: "1rem" }}>
            <Cloud fontSize="small" />
          </AccountCircleOutlinedIcon>
          <ListItemText>
            <Typography variant="h5">Profile Details</Typography>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default Sidebar;
