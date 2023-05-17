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
  FoundationOutlined,
  RequestPageOutlined,
  TrendingUpOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "admin/assets/profile.jpeg";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FlexBox from "./FlexBox";

const navItems = [
  {
    id: 1,
    url: "dashboard",
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    id: 2,
    text: "Client Project",
    icon: null,
  },
  {
    id: 3,
    url: "planRequests",
    text: "Plan Requests",
    icon: <SendOutlined />,
  },
  {
    id: 4,
    url: "projectPlans",
    text: "Project Plans",
    icon: <MapOutlined />,
  },
  {
    id: 5,
    url: "",
    text: "Client Projects",
    icon: <ReceiptLongOutlined />,
  },
  {
    id: 6,
    text: "Donations",
    icon: null,
  },
  {
    id: 7,
    url: "donations",
    text: "Donations",
    icon: <VolunteerActivismOutlined />,
  },
  {
    id: 8,
    url: "ruralProjects",
    text: "Rural Projects",
    icon: <FoundationOutlined />,
  },
  {
    id: 9,
    text: "Products",
    icon: null,
  },
  {
    id: 10,
    url: "products",
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    id: 12,
    url: "productRequest",
    text: "Product Requests",
    icon: <RequestPageOutlined />,
  },
  {
    id: 12,
    text: "Recent",
    icon: null,
  },
  {
    id: 13,
    url: "completedProjects",
    text: "Completed Projects",
    icon: <EventAvailableIcon />,
  },
  
  {
    id: 13,
    url: "recentProjects",
    text: "Recent Projects",
    icon: <AccessTimeOutlined />,
  },
  {
    id: 14,
    url: "",
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
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  console.log(user);

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
              {navItems.map(({ id, url, text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={id} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                const lcText = "admin/" + url;

                return (
                  <ListItem key={id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/admin/${url}`);
                        setActive(`admin/${url}`);
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
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  System Admin
                </Typography>
              </Box>
              {/*<SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />*/}
            </FlexBox>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
