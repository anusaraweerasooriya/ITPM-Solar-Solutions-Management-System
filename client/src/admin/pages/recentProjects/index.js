import { Box, Typography } from "@mui/material";
import Header from "admin/components/Header";
import CompletedProjects from "./completedProjects";

const AdminRecentProjects = () => {        
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="RECENT PROJECTS" subtitle="Recent Project Management" />    
      
        <Typography variant="h4" mt="0.5rem" pl="35rem" justifyContent="center">
            Completed Projects
        </Typography>
        <CompletedProjects />

    </Box>
  );
};

export default AdminRecentProjects;