import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
  Menu as MenuComponent,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Close,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "hooks/auth-hook";
import FlexBox from "admin/components/FlexBox";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <FlexBox padding="1rem 6%" backgroundColor={theme.palette.primary[500]}>
      <FlexBox gap="0.4rem">
        <Typography
          fontWeight="bold"
          fontSize="1.5rem"
          color={theme.palette.secondary.main}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          SOLAR4MATION
        </Typography>
      </FlexBox>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBox gap="2.5rem">
          <Typography
            fontSize="1rem"
            color="#ffffff"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: theme.palette.secondary.main,
                cursor: "pointer",
              },
            }}
          >
            Home
          </Typography>

          <Typography
            fontSize="1rem"
            color="#ffffff"
            onClick={() => navigate("/generateBill")}
            sx={{
              "&:hover": {
                color: theme.palette.secondary.main,
                cursor: "pointer",
              },
            }}
          >
            Calculator
          </Typography>

          <Typography
            fontSize="1rem"
            color="#ffffff"
            onClick={() => navigate("/products")}
            sx={{
              "&:hover": {
                color: theme.palette.secondary.main,
                cursor: "pointer",
              },
            }}
          >
            Products
          </Typography>

          <Typography
            fontSize="1rem"
            color="#ffffff"
            onClick={() => navigate("/projects")}
            sx={{
              "&:hover": {
                color: theme.palette.secondary.main,
                cursor: "pointer",
              },
            }}
          >
            Projects
          </Typography>

          <Typography
            fontSize="1rem"
            color="#ffffff"
            onClick={() => navigate("/donate")}
            sx={{
              "&:hover": {
                color: theme.palette.secondary.main,
                cursor: "pointer",
              },
            }}
          >
            Donate
          </Typography>

          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              isAuth ? navigate("/profile/submitRequest") : navigate("/login");
            }}
            sx={{
              textTransform: "unset",
              fontWeight: "bold",
              fontSize: "0.9rem",
              color: "#000000",
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: theme.palette.secondary[300],
                cursor: "pointer",
              },
            }}
          >
            Get a Quote
          </Button>

          {!isAuth ? (
            <Button
              variant="contained"
              size="medium"
              color="error"
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "unset",
                fontWeight: "bold",
                fontSize: "0.9rem",
                borderRadius: "20px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Login
            </Button>
          ) : (
            <FlexBox>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "0.5rem",
                }}
              >
                <AccountCircle
                  sx={{
                    color: "#ffffff",
                    fontSize: "1.9rem",
                    borderRadius: "20%",
                  }}
                />
                <ArrowDropDownOutlined
                  sx={{ color: "#ffffff", fontSize: "25px" }}
                />
              </Button>
              <MenuComponent
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={() => navigate("/profile/pendingRequests")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </MenuComponent>
            </FlexBox>
          )}
        </FlexBox>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon
            sx={{
              color: "#ffffff",
              fontSize: "1.8rem",
            }}
          />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={theme.palette.primary[500]}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <Typography
              fontSize="1rem"
              color="#ffffff"
              onClick={() => navigate("/home")}
              sx={{
                "&:hover": {
                  color: theme.palette.secondary[200],
                  cursor: "pointer",
                },
              }}
            >
              Home
            </Typography>

            <Typography
              fontSize="1rem"
              color="#ffffff"
              onClick={() => navigate("/products")}
              sx={{
                "&:hover": {
                  color: "#ffd166",
                  cursor: "pointer",
                },
              }}
            >
              Products
            </Typography>

            <Typography
              fontSize="1rem"
              color="#ffffff"
              onClick={() => navigate("/projects")}
              sx={{
                "&:hover": {
                  color: "#ffd166",
                  cursor: "pointer",
                },
              }}
            >
              Projects
            </Typography>

            <Typography
              fontSize="1rem"
              color="#ffffff"
              onClick={() => navigate("/donate")}
              sx={{
                "&:hover": {
                  color: "#ffd166",
                  cursor: "pointer",
                },
              }}
            >
              Donate
            </Typography>

            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate("/submitRequest")}
              sx={{
                textTransform: "unset",
                fontWeight: "bold",
                fontSize: "0.9rem",
                color: "#000000",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#ffe3a3",
                  cursor: "pointer",
                },
              }}
            >
              Get a Quote
            </Button>

            {!isAuth ? (
              <Button
                variant="contained"
                size="medium"
                color="error"
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "unset",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    color: "#ffffff",
                    cursor: "pointer",
                  },
                }}
              >
                Login
              </Button>
            ) : (
              <FlexBox>
                <Button
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textTransform: "none",
                    gap: "0.5rem",
                  }}
                >
                  <AccountCircle
                    sx={{
                      color: "#ffffff",
                      fontSize: "1.9rem",
                      borderRadius: "20%",
                    }}
                  />
                  <ArrowDropDownOutlined
                    sx={{ color: "#ffffff", fontSize: "25px" }}
                  />
                </Button>
                <MenuComponent
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <MenuItem onClick={() => navigate("/pendingRequests")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </MenuComponent>
              </FlexBox>
            )}
          </FlexBox>
        </Box>
      )}
    </FlexBox>
  );
};

export default Navbar;
