import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import Header from "admin/components/Header";
import AddPlanForm from "./AddPlanForm";
import Products from "./Products";

const AddProjectPlan = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PROJECT PLAN" subtitle="Project Plan Management" />
      <Box>
        <Box
          width="100%"
          pt="2rem"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "58%" : undefined}>
            <AddPlanForm />
          </Box>
          <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
            <Products />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProjectPlan;
