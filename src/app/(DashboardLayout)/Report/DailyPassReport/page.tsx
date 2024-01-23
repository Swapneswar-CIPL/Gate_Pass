"use client";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { getAllDailyPasses } from "@/utils/api";
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
// import { DataGridPro } from '@mui/x-data-grid-pro';


import {
  DataGrid,
  GridToolbar,
  gridFilteredSortedRowIdsSelector,
  selectedGridRowsSelector,
  GridRowId,
  GridColDef,
  GridPrintGetRowsToExportParams,
} from "@mui/x-data-grid";

// import { GridPrintExportOptions } from '@mui/x-data-grid-premium';

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
  width: "600px",
  height: "auto",
  bgcolor: "white",
  p: 2,
};

const ProductPerformance = () => {
  const [passList, setPassList] = useState([]);
  // Modal states
  const [modalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const handleOpen = (id: any) => {
    const selectedProductData = passList.find((prod: any) => prod._id === id);
    setSelectedProduct(selectedProductData);
    setOpen(true);
  };

  const getRowId = (row: any) => row.id;
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
    console.log("------", selectedProduct);
    if (!selectedProduct) {
      return null;
    }

    return (
      <div>
        <Box sx={style}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} >
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
                  Daily Pass Report Details
                  <CancelIcon onClick={handleClose}></CancelIcon>
                </Typography>

                <BoxWrapper>
                  <Typography fontWeight={600}>Name:</Typography>
                  <Typography> {selectedProduct.formattedNames}</Typography>
                </BoxWrapper>

                <BoxWrapper>
                  <Typography fontWeight={600}>Pass Number:</Typography>
                  <Typography> {selectedProduct.passNumber}</Typography>
                </BoxWrapper>

                <BoxWrapper>
                  <Typography fontWeight={600}>Officer Name:</Typography>
                  <Typography> {selectedProduct.reporting_officer}</Typography>
                </BoxWrapper>
                <BoxWrapper>
                  <Typography fontWeight={600}>Gender:</Typography>
                  <Typography>
                  {selectedProduct.gender}
                  </Typography>
                </BoxWrapper>

                <BoxWrapper>
                  <Typography fontWeight={600}>Mobile No:</Typography>
                  <Typography> {selectedProduct.mobile_num}</Typography>
                </BoxWrapper>
                <BoxWrapper>
                  <Typography fontWeight={600}>Purpose:</Typography>
                  <Typography>
                    {" "}
                    {selectedProduct.message_and_purpose}
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
                  <Typography fontWeight={600}>Building_Room_No:</Typography>
                  <Typography>
                  {selectedProduct.building_room_num}
                  </Typography>
                </BoxWrapper>

              

                <BoxWrapper>
                  <Typography fontWeight={600}>Material:</Typography>
                  <Typography>
                  {selectedProduct.material}
                  </Typography>
                </BoxWrapper>

                
                <BoxWrapper>
                  <Typography fontWeight={600}>Unique_ID_No:</Typography>
                  <Typography>
                  {selectedProduct.unique_id}
                  </Typography>
                </BoxWrapper>

              
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
      const passes = await getAllDailyPasses();
      setPassList(passes.allData);
    }

    fetchOfficers();
  }, []);
  console.log(passList, "passListpassListpassList");

  const columns: GridColDef[] = [
    {
      field: "ranodm_1", // confirm this
      headerName: "S.No",
      valueGetter: (params: any) =>
        params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "passNumber", headerName: "Pass Number", width: 150 },
    { field: "formattedNames", headerName: "Name", width: 150 },
    { field: "mobile_num", headerName: "Mobile No.", width: 150 },
    {
      field: "message_and_purpose",
      headerName: "Purpose",
      width: 150,
    },
    {
      field: "reporting_officer",
      headerName: "Officer",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
      valueFormatter: (params: any) => {
        return dayjs(params.value).format("DD-MM-YYYY");
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,

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
  const rowsWithSerial:any = passList.map((data: any, index) => ({
    ...data,
    serialNumber: index + 1,
  }));

  return (
    <PageContainer
      title="Daily Pass Report"
      description="List of all the gate pass"
    >
      <DashboardCard title="Daily Pass Report">
        <>
          <DataGrid
            checkboxSelection
            autoHeight
            density="compact"

            columnHeaderHeight={35}
            rowHeight={35}
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
              toolbar: {
                printOptions: { getRowsToExport: getSelectedRowsToExport },
              },
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
