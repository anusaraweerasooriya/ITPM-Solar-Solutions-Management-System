import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

import Header from "admin/components/Header";
import AddPlanForm from "./AddPlanForm";
import Products from "./Products";
import { useGetServicePackByRequestQuery } from "hooks/api-hook";

const AddProjectPlan = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id } = useParams();
  const { data } = useGetServicePackByRequestQuery({ reqId: id });

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
          <Box flexBasis={isNonMobileScreens ? "55%" : undefined}>
            <AddPlanForm
              productCost={data && data.pack.totalProductCost}
              reqId={id}
            />
          </Box>
          <Box flexBasis={isNonMobileScreens ? "45%" : undefined}>
            {data && <Products servicePack={data && data.pack} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProjectPlan;
