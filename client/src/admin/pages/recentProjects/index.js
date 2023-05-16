import { Box, Typography } from "@mui/material";
import Header from "admin/components/Header";
import CompletedProjects from "./completedProjects";

const AdminRecentProjects = () => {        
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="RECENT PROJECTS" subtitle="Recent Project Management" />    
      
        <CompletedProjects />

    </Box>
  );
};

export default AdminRecentProjects;