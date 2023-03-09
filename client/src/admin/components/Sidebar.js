import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  MapOutlined,
  ShoppingCartOutlined,
  VolunteerActivismOutlined,
  SendOutlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  FoundationOutlined,
  RequestPageOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  AccessTimeOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "admin/assets/profile.jpeg";
import FlexBox from "./FlexBox";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Project",
    icon: null,
  },
  {
    text: "Plan Requests",
    icon: <SendOutlined />,
  },
  {
    text: "Project Plans",
    icon: <MapOutlined />,
  },
  {
    text: "Client Projects",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Donations",
    icon: null,
  },
  {
    text: "Donations",
    icon: <VolunteerActivismOutlined />,
  },
  {
    text: "Rural Projects",
    icon: <FoundationOutlined />,
  },
  {
    text: "Products",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Product Requests",
    icon: <RequestPageOutlined />,
  },
  {
    text: "Recent",
    icon: null,
  },
  {
    text: "Recent Projects",
    icon: <AccessTimeOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobileScreen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.primary[500],
              borderWidth: isNonMobileScreen ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBox color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    SOLAR4MATION
                  </Typography>
                </Box>
                {!isNonMobileScreen && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBox>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/admin/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                        ":hover": {
                          backgroundColor: theme.palette.primary[300],
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box
            position="sticky"
            bottom="0.1rem"
            sx={{ mt: "1rem", backgroundColor: theme.palette.primary[300] }}
          >
            <Divider />
            <FlexBox
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 1rem 2.5rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{
                  objectFit: "cover",
                }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Manager
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBox>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
