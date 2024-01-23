"use client";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { getAllMonthlyPasses } from "@/utils/api";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  Select,
  MenuItem,
  TextField,
  Grid,
  Modal,
  Divider,
  Pagination,
  PaginationItem,
} from "@mui/material";

import Link from "next/link";

import {
  DataGrid,
  GridToolbar,
  GridPrintGetRowsToExportParams,
  gridFilteredSortedRowIdsSelector,
  selectedGridRowsSelector,
  GridRowId,
  GridColDef
} from '@mui/x-data-grid';

import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";


import { useAuth } from "@/context/JWTContext/AuthContext.provider";


const BoxWrapper = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0 10px",
  margin: "10px 0",
  "& > p": {
    fontSize: "12px",
  },
}));
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "auto",
  bgcolor: "white",
  p: 2,
};
const ProductPerformance = () => {
  const [passList, setPassList] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const handleOpen = (id: any) => {
    const selectedProductData = passList.find((prod: any) => prod._id === id);
    setSelectedProduct(selectedProductData);
    setOpen(true);
  };



  const getRowId = (row:any) => row.id;
  const getSelectedRowsToExport = ({
    apiRef,
  }: GridPrintGetRowsToExportParams): GridRowId[] => {
    const selectedRowIds = selectedGridRowsSelector(apiRef);
    if (selectedRowIds.size > 0) {
      return Array.from(selectedRowIds.keys());
    }
  
    return gridFilteredSortedRowIdsSelector(apiRef);
  };

  
  const router = useRouter();
  const authCtx: any = useAuth();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const handleClose = () => setOpen(false);

  const ModalContent = () => {
    if (!selectedProduct) {
      return null;
    }

    return (
      <div>
        <Box sx={style}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    background: "#5d87FF",
                    color: "#fff",
                    p: 1,
                    justifyContent: "space-between",
                    display: "flex",
                    fontWeight: "700",
                    fontSize: "1.125rem",
                  }}
                >
                  Monthly Pass Report Details
                  <CancelIcon onClick={handleClose}></CancelIcon>
                </Typography>






                <BoxWrapper>
                  <Typography fontWeight={600}>Name:</Typography>
                  <Typography> {selectedProduct.name}</Typography>
                </BoxWrapper>
               
                <BoxWrapper>
                  <Typography fontWeight={600}>Pass Number:</Typography>
                  <Typography> {selectedProduct.passNumber}</Typography>
                </BoxWrapper>

                <BoxWrapper>
                  <Typography fontWeight={600}>Mobile No:</Typography>
                  <Typography> {selectedProduct.mobile}</Typography>
                </BoxWrapper>
                <BoxWrapper>
                  <Typography fontWeight={600}>Purpose:</Typography>
                  <Typography>
                    {" "}
                    {selectedProduct.purpose}
                  </Typography>
                </BoxWrapper>

                <BoxWrapper>
                  <Typography fontWeight={600}>Date:</Typography>
                  <Typography>
                  {formatDate(selectedProduct.updatedAt)}
                  </Typography>
                </BoxWrapper>
                <BoxWrapper>
                  <Typography fontWeight={600}>Address:</Typography>
                  <Typography>
                    {" "}
                    {selectedProduct.address}
                  </Typography>
                </BoxWrapper>
                <BoxWrapper>
                  <Typography fontWeight={600}>Gender:</Typography>
                  <Typography>
                  {selectedProduct.gender}
                  </Typography>
                </BoxWrapper>

         

                <BoxWrapper>
                  <Typography fontWeight={600}>Designation:</Typography>
                  <Typography>
                  {selectedProduct.designation}
                  </Typography>
                </BoxWrapper>

                
                <BoxWrapper>
                  <Typography fontWeight={600}>Unique_ID_No:</Typography>
                  <Typography>
                  {selectedProduct.unique_id}
                  </Typography>
                </BoxWrapper>

                {/* <Box
                  sx={{
                    overflow: "auto",
                    width: { xs: "280px", sm: "auto" },
                    padding: "0px",
                  }}
                >
                  <Table
                    aria-label="simple table"
                    sx={{ whiteSpace: "nowrap" }}
                    key={selectedProduct._id}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.name}
                      </TableCell>
                    </TableRow>
                 

                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Pass Number
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.passNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Mobile
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.mobile}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Purpose
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.purpose}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Date
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {formatDate(selectedProduct.updatedAt)}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Address
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.address}
                      </TableCell>
                    </TableRow>

                   


                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Gender
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.gender}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
Designation                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.designation}
                      </TableCell>
                    </TableRow>


                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Unique_ID_No
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.unique_id}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Box> */}




                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: "13%",
                      background: "#5d87FF",
                      height: "30px",
                      color: "#fff",
                      marginBottom: "20px",
                    }}
                    onClick={handleClose}
                  >
                    close
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider />
      </div>
    );
  };

  useEffect(() => {
    async function fetchOfficers() {
      const passes = await getAllMonthlyPasses();
      setPassList(passes.allData);
    }

    fetchOfficers();
  }, []);
  console.log(passList, "passListpassListpassList");

  const columns: GridColDef[] = [
    {
      field: "ranodm_1", // confirm this
      headerName: "S.No",
      width: 120,
      valueGetter: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "passNumber", headerName: "Pass Number", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "mobile", headerName: "Mobile No.", width: 170 },
    {
      field: "purpose",
      headerName: "Purpose", width: 170
    },
   
    { field: "createdAt", headerName: "Date", width: 170, 
    valueFormatter: (params) => {
      return dayjs(params.value).format("DD-MM-YYYY")
    },
  
  },
    {
      field: "action",
      headerName: "Action", width: 170,

      renderCell: (params: any) => (
        <button
          style={{
            background: "none",
            border: "none",
            color: "#4C7AFF",
            fontSize: "13px",
            padding: 0,
            cursor: "pointer",
          }}
          onClick={() => handleOpen(params.row._id)}
        >
          <VisibilityIcon />
        </button>
      ),
    },
  ];
  const rowsWithSerial = passList.map((data: any, index) => ({
    ...data,
    serialNumber: index + 1,
  }));

  return (
    <PageContainer title="Monthly Pass Report" description="List of all the gate pass">
      <DashboardCard title="Monthly Pass Report">
        <>
          <DataGrid
          checkboxSelection
            columnHeaderHeight={35}
            rowHeight={35}
            density="compact"

            slots={{
              toolbar: GridToolbar,
            }}
            rows={rowsWithSerial}
            columns={columns}
          
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#121212",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "16px",
              },
              ".bg-light": {
                bgcolor: "#eee",
              },
              ".bg-dark": {
                bgcolor: "#fff",
              },
            
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            getRowId={(row: any) => row._id}
            pageSizeOptions={[25, 50, 100]}
            disableRowSelectionOnClick
            
            getRowClassName={(params) => {
              return (params.indexRelativeToCurrentPage + 1) % 2 === 0
                ? "bg-light"
                : "bg-dark";
            }}
            slotProps={{
              toolbar: { printOptions: { getRowsToExport: getSelectedRowsToExport } },
            }}
          />

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <ModalContent />
          </Modal>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProductPerformance;
