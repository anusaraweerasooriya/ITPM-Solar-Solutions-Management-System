import { useState } from "react";
import {
  InputBase,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Button,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBox from "admin/components/FlexBox";

const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <FlexBox padding="1rem 6%" backgroundColor={theme.palette.primary[500]}>
            <FlexBox gap="0.4rem">
                <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color={theme.palette.secondary.main}
                onClick={() => navigate("/")}
                >
                Solar4Mation
                </Typography>
            </FlexBox>
    
            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBox gap="2.5rem">
                    <Typography
                        fontSize="1.2rem"
                        color="#ffffff"
                        onClick={() => navigate("/")}
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
                        fontSize="1.2rem"
                        color="#ffffff"
                        onClick={() => navigate("/about")}
                        sx={{
                            "&:hover": {
                            color: theme.palette.secondary.main,
                            cursor: "pointer",
                            },
                        }}
                        >
                        About Us
                    </Typography>

                    <Typography
                        fontSize="1.2rem"
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
                        fontSize="1.2rem"
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
                        fontSize="1.2rem"
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

                    <Button variant="contained" size="large"
                        sx={{
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

                    {/*<Button variant="outlined" size="large" color="warning"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                            borderRadius: "20px",
                            "&:hover": {
                                backgroundColor: "#ffe3a3",
                                cursor: "pointer",
                            },
                        }}
                    >
                        Login
                    </Button>*/}

                    <AccountCircle 
                        sx={{
                            color: "#ffffff",
                            fontSize: "2.1rem",
                            borderRadius: "20%"
                        }}
                    />
                </FlexBox>
            ) : (
                <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                <Menu 
                    sx={{
                        color: "#ffffff",
                        fontSize: "2rem",
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
                        fontSize="1.2rem"
                        color="#ffffff"
                        onClick={() => navigate("/")}
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
                        fontSize="1.2rem"
                        color="#ffffff"
                        onClick={() => navigate("/about")}
                        sx={{
                            "&:hover": {
                            color: "#ffd166",
                            cursor: "pointer",
                            },
                        }}
                        >
                        About Us
                    </Typography>

                    <Typography
                        fontSize="1.2rem"
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
                        fontSize="1.2rem"
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
                        fontSize="1.2rem"
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

                    <Button variant="contained" size="large"
                        sx={{
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

                    {/*<Button variant="outlined" size="large" color="warning"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                            borderRadius: "20px",
                            "&:hover": {
                                backgroundColor: "#ffe3a3",
                                cursor: "pointer",
                            },
                        }}
                    >
                        Login
                    </Button>*/}

                    <AccountCircle 
                        sx={{
                            color: "#ffffff",
                            fontSize: "2.1rem",
                            borderRadius: "20%"
                        }}
                    />
                </FlexBox>
                
                </Box>
            )}
            

            

        
        </FlexBox>
    );
}

export default Navbar;