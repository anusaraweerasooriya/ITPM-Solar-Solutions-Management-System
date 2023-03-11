import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBox from "./FlexBox";
import { useDispatch } from "react-redux";
import { setLogout } from "hooks/auth-hook";
import { useNavigate } from "react-router-dom";
import profileImage from "admin/assets/profile.jpeg";
import {
  Box,
  Typography,
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";

const NavbarAdmin = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.primary[500],
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE OF THE APP BAR */}
        <FlexBox>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>

          <FlexBox
            backgroundColor={theme.palette.primary[400]}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBox>
        </FlexBox>

        {/* RIGHT SIDE OF THE APP BAR */}
        <FlexBox>
          <IconButton>
            <SettingsOutlined sx={{ color: "white", mr: "0.5rem" }} />
          </IconButton>

          <FlexBox>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                ></Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                ></Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBox>
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
