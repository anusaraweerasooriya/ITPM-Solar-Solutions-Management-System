import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  TableContainer,
  TableHead,
  Paper,
  Chip,
  Box,
  Typography,
} from "@mui/material";

const BillTable = ({ billData }) => {
  console.log(billData.data.avgUnitsPerMonth);
  console.log(billData.priceList.v1u2price);
  console.log(billData.priceList[0].v1u1price);
  const isVersion1 = billData.data.avgUnitsPerMonth <= 60;
  console.log(isVersion1);

  return (
    <Box m="3.2rem">
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead sx={{ height: "5rem", background: "#799c81" }}>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold" variant="h5">
                  Generate ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" variant="h5">
                  Import Charge
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" variant="h5" color="#042e70">
                  Fixed Charge
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" variant="h5" color="#73032c">
                  Total Expected Charge
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="1" sx={{ backgroundColor: "#f2f0ed" }}>
              <TableCell>
                <Chip label={billData.data._id} />
              </TableCell>
              <TableCell>
                {isVersion1 ? (
                  <>
                    <Typography>
                      {billData.priceList[0].v1u1price.toFixed(2)} x{" "}
                      {billData.noOfUnitsList[0].v1u1units || 0} ={" "}
                      {billData.v1u1total.toFixed(2) || 0}
                    </Typography>
                    <Typography>
                      {billData.priceList[1].v1u2price.toFixed(2)} x{" "}
                      {billData.noOfUnitsList[1].v1u2units || 0} ={" "}
                      {billData.v1u2total.toFixed(2) || 0}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography>
                      {" "}
                      {billData.priceList[2].v2u1price.toFixed(2)} x{" "}
                      {billData.noOfUnitsList[2].v2u1units || 0} ={" "}
                      {billData.v2u1total.toFixed(2) || 0}
                    </Typography>
                    <Typography>
                      {" "}
                      {billData.priceList[3].v2u2price.toFixed(2)} x{" "}
                      {billData.noOfUnitsList[3].v2u2units || 0} ={" "}
                      {billData.v2u2total.toFixed(2) || 0}
                    </Typography>
                    <Typography>
                      {" "}
                      {billData.priceList[4].v2u3price.toFixed(2)} x{" "}
                      {billData.noOfUnitsList[4].v2u3units || 0} ={" "}
                      {billData.v2u3total.toFixed(2) || 0}
                    </Typography>
                    <Typography>
                      {" "}
                      {billData.priceList[5].v2u4price.toFixed(2)} x{" "}
                      {billData.noOfUnitsList[5].v2u4units || 0} ={" "}
                      {billData.v2u4total.toFixed(2) || 0}{" "}
                    </Typography>
                    <Typography>
                      {" "}
                      {billData.priceList[6].v2u5price.toFixed(2)} x{" "}
                      {billData.noOfUnitsList[6].v2u5units || 0} ={" "}
                      {billData.v2u5total.toFixed(2) || 0}{" "}
                    </Typography>
                  </>
                )}
              </TableCell>
              <TableCell>
                <Typography sx={{ color: "#397eed" }}>
                  {billData.fixedCharge.toFixed(2)} x 1 ={" "}
                  {billData.fixedCharge.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="#b50b57">
                  {billData.totalBill.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow key="2" sx={{ backgroundColor: "#cbe0f7" }}>
              <TableCell></TableCell>
              <TableCell>
                <Typography fontWeight="bold" variant="h5">
                  {billData.totalPriceForElectricity.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" variant="h5" color="#499cf5">
                  {billData.fixedCharge.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={billData.totalBill.toFixed(2)}
                  size="large"
                  sx={{
                    backgroundColor: "#9c0564",
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "0.9rem",
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BillTable;
