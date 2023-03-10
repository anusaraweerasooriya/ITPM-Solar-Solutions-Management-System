import {
    Typography,
    Box,
    useTheme
} from "@mui/material";

const Footer = () => {
    const theme = useTheme();
    return (
        <Box mt="70px" p="40px 0" backgroundColor={theme.palette.primary[500]}>
            <Box
                width="80%"
                margin="auto"
                display="flex"            
                flexWrap="wrap"
                justifyContent="space-between"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"            
            >
                <Box width="clamp(20%, 30%, 40%)" color="#ffffff">
                    <Typography fontSize="clamp(1rem, 2rem, 2.25rem)" fontWeight="bold" mb="60px" color={theme.palette.secondary.main}>
                        Solar4Mation
                    </Typography>
                    <Typography fontSize="1rem" mb="30px">+94 112 123 123</Typography>
                    <Typography fontSize="1rem" mb="30px">solar4mation@gmail.com</Typography>
                    <Typography fontSize="1rem" mb="30px">No 12, Woodland Street, Havelock</Typography>
                </Box>

                <Box color="#ffffff">
                    <Typography fontSize="1.3rem" fontWeight="bold" mb="30px">
                        About Us
                    </Typography>
                    <Typography fontSize="1rem" mb="30px">Terms & Conditions</Typography>
                    <Typography fontSize="1rem" mb="30px">Privacy Policy</Typography>
                    <Typography fontSize="1rem" mb="30px">Careers</Typography>
                    <Typography fontSize="1rem" mb="30px">Help Center</Typography>
                </Box>

                <Box color="#ffffff">
                    <Typography fontSize="1.3rem" fontWeight="bold" mb="30px" color="#ffffff">
                        Our Projects
                    </Typography>
                    <Typography fontSize="1rem" mb="30px">Domestic Projects</Typography>
                    <Typography fontSize="1rem" mb="30px">Commercial Projects</Typography>
                    <Typography fontSize="1rem" mb="30px">Rural Projects</Typography>
                </Box>

                <Box width="clamp(20%, 25%, 30%)" color="#ffffff">
                    <Typography fontSize="1.3rem" fontWeight="bold" mb="30px" color="#ffffff">
                        Our Services
                    </Typography>
                    <Typography fontSize="1rem" mb="30px">Get a Quote</Typography>
                    <Typography fontSize="1rem" mb="30px">Calculate bill</Typography>
                    <Typography fontSize="1rem" mb="30px">View Products</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Footer;