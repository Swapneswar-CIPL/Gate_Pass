"use client";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { getAllMonthlyPasses } from "@/utils/api";
import CancelIcon from "@mui/icons-material/Cancel";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomModal from "../../components/CustomModal/CustomModal";

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


import {
  DataGrid,
  GridToolbar,
  GridPrintGetRowsToExportParams,
  gridFilteredSortedRowIdsSelector,
  selectedGridRowsSelector,
  GridRowId,
  GridColDef,
} from "@mui/x-data-grid";

import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";

import { useAuth } from "@/context/JWTContext/AuthContext.provider";
import axios from "axios";


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
  // Modal states
  const [modalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const handleOpen = (id: any) => {
    const selectedProductData = passList.find((prod: any) => prod._id === id);


    if (selectedProductData) {
      setSelectedProduct(selectedProductData);
            setModalState(true)
      setOpen(true);

          }
   
  };

  const handleDownload: any = (params: any) => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/images/${params}`;
    saveAs(url, `Image-${params.authority_name}`);
    console.log("authority-lrtter", params.authority_letter);
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

 

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/authorities/getAll`
        );
        setPassList(res.data.data);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    getData();
  }, []);
  console.log(passList, "passListpassListpassList");

  const columns: GridColDef[] = [
    {
      field: "ranodm_1", // confirm this
      headerName: "S.No",
      width: 100,
      valueGetter: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "vendor_name", headerName: "Vendor Name", width: 150 },
    { field: "authority_name", headerName: "Authority Name", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
   

    {
      field: "download",
      headerName: "Authority Letter",
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
      

        <Box sx={{ cursor: "pointer" }}>
          Download {""}
          <DownloadIcon
            onClick={() => {
              handleDownload(params.row.authority_letter);
            }}
          />
        </Box>
      ),
    },

    {
      field: "createdAt",
      headerName: "Expiry Date",
      width: 150,
      valueFormatter: (params) => {
        return dayjs(params.value).format("DD-MM-YYYY");
      },
    },
    { field: "approvedStatus", headerName: "Approval Status", width: 170 },

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
  const rowsWithSerial = passList.map((data: any, index) => ({
    ...data,
    serialNumber: index + 1,
    // openDialog: false, // Add this property
  }));

 

  return (
    <PageContainer title="show Authorities" description="List of all the gate pass">
      <DashboardCard title="Show Authorities">
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
              toolbar: {
                printOptions: { getRowsToExport: getSelectedRowsToExport },
              },
            }}
          />

          <CustomModal modalState={modalState} setModalState={setModalState}>
            <>
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
                  Authority Details
                </Typography>
              <BoxWrapper>
                <Typography fontWeight={600}>Vendor Name:</Typography>
                <Typography>{selectedProduct?.vendor_name}</Typography>
              </BoxWrapper>
              <BoxWrapper>
                <Typography fontWeight={600}>Authority Name:</Typography>
                <Typography>{selectedProduct?.authority_name}</Typography>
              </BoxWrapper>
              <BoxWrapper>
                <Typography fontWeight={600}>Status:</Typography>
                <Typography>{selectedProduct?.status}</Typography>
              </BoxWrapper>
            
              <BoxWrapper>
                <Typography fontWeight={600}>Expiry Date:</Typography>
                <Typography>
                  {dayjs(selectedProduct?.expiryDate).format("DD/MM/YYYY")}
                </Typography>
              </BoxWrapper>
              <BoxWrapper>
                <Typography fontWeight={600}>Approved Status:</Typography>
                <Typography>
                  {selectedProduct?.approvedStatus?.toString()?.toUpperCase()}
                </Typography>
              </BoxWrapper>
            </>
          </CustomModal>

       
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProductPerformance;
