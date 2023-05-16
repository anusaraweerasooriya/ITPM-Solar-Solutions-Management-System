import {
    Typography,
    Box,
    useTheme
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isAuth = useSelector((state) => state.auth.isAuth);

    return (
        <Box mt="40px" p="30px 0" backgroundColor={theme.palette.primary[500]} color="#ffffff">
            <Box
                width="80%"
                margin="auto"
                display="flex"            
                flexWrap="wrap"
                justifyContent="space-between"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"            
            >
                <Box width="clamp(20%, 30%, 40%)">
                    <Typography fontSize="1.5rem" fontWeight="bold" mb="20px" color={theme.palette.secondary.main} 
                        onClick={() => navigate("/home")}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        SOLAR4MATION
                    </Typography>
                    <Typography fontSize="0.9rem" mb="20px">+94 112 123 123</Typography>
                    <Typography fontSize="0.9rem" mb="20px">solar4mation@gmail.com</Typography>
                    <Typography fontSize="0.9rem" mb="20px">No 12, Woodland Street, Havelock</Typography>
                </Box>

                <Box>
                    <Typography fontSize="1.1rem" fontWeight="bold" mb="20px">
                        About Us
                    </Typography>
                    <Typography fontSize="0.9rem" mb="20px">Terms & Conditions</Typography>
                    <Typography fontSize="0.9rem" mb="20px">Privacy Policy</Typography>
                    <Typography fontSize="0.9rem" mb="20px">Help Center</Typography>
                </Box>

                <Box>
                    <Typography fontSize="1.1rem" fontWeight="bold" mb="20px">
                        Our Projects
                    </Typography>
                    <Typography fontSize="0.9rem" mb="20px" 
                        onClick={() => navigate("/projects")} 
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Domestic Projects
                    </Typography>
                    <Typography fontSize="0.9rem" mb="20px" 
                        onClick={() => navigate("/projects")} 
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Commercial Projects
                    </Typography>
                    <Typography fontSize="0.9rem" mb="20px" 
                        onClick={() => navigate("/projects")} 
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Rural Projects
                    </Typography>
                </Box>

                <Box width="clamp(20%, 25%, 30%)">
                    <Typography fontSize="1.1rem" fontWeight="bold" mb="20px">
                        Our Services
                    </Typography>
                    <Typography fontSize="0.9rem" mb="20px" 
                        onClick={() => { isAuth ? navigate("/submitRequest") : navigate("/login"); }} 
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Get a Quote
                    </Typography>
                    <Typography fontSize="0.9rem" mb="20px" 
                        onClick={() => navigate("/generateBill")} 
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Calculate bill
                    </Typography>
                    <Typography fontSize="0.9rem" mb="20px" 
                        onClick={() => navigate("/products")} 
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        View Products
                    </Typography>
                </Box>
            </Box>
            <hr></hr>
            <Typography fontSize="0.8rem"  align="center">
                Copyright © 2023 - Solar4Mation - All Rights Reserved.
            </Typography>
        </Box>
    );
}

export default Footer;