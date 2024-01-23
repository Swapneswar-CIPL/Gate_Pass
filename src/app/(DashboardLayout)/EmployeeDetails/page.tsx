"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { createEmployee, getAllEmployee } from "@/utils/api";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomTextField2 from "../components/forms/theme-elements/CustomTextField2";

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
  Stack,
  SelectChangeEvent,
} from "@mui/material";


import {
  DataGrid,
  GridToolbar,
  gridFilteredSortedRowIdsSelector,
  selectedGridRowsSelector,
  GridRowId,
  GridColDef,
  GridPrintGetRowsToExportParams,
} from "@mui/x-data-grid";


import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";

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
interface EmployeeData {
  // emp_id: number | null;
  emp_id: string;

  name: string;
  gender: string;
  phone_num: string;
  email_id: string;
  password: string;
  genderOptions: string[];
}

const ProductPerformance = () => {
  const [passList, setPassList] = useState([]);
  // Modal states
  const [modalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [showAddForm, setShowAddForm] = useState(false);

  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    emp_id: "",
    name: "",
    gender: "",
    phone_num:"",
    email_id: "",
    password: "",
    genderOptions: ["Male", "Female", "Other"],
  });

  useEffect(() => {
    fetchEmployees();
  }, []);
  const isEmailValid = () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(employeeData.email_id);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   
    const { name, value } = event.target;


      // Validate emp_id to allow only numbers
  if (name === 'emp_id' && !/^\d+$/.test(value)) {
    // If the input is not a number, do not update the state
    return;
  }
    
    // Validate the "name" input
    if (name === 'name') {
      // Allow only letters (alphabets)
      const isValidInput = /^[A-Za-z]+$/.test(value);

      if (!isValidInput) {
        // Notify the user or handle the validation error in your preferred way
        console.log("Name should contain only letters");
        return;
      }
      if (value.length > 50) {
        // Notify the user or handle the validation error in your preferred way
        console.log("Name should not exceed 50 characters");
        return;
      }
    }


    if (name === 'phone_num') {
      // Remove non-numeric characters and limit the length to 10 characters
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);

      // Update the state
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      // For other inputs, update the state directly
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    
   
    // setEmployeeData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

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
  const handleClose = () => {
    setShowAddForm(false);
    setOpen(false);
  };
  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddEmployee = async () => {
    if (
      !employeeData.emp_id ||
      !employeeData.name ||
      !employeeData.gender ||
      !employeeData.email_id ||
      !employeeData.phone_num ||
      !employeeData.password
    ) {
      // If any required field is empty, display an error or handle it accordingly
      console.log("Please fill all the required fields");
      // alert("All fields are mandatory!")

      toast.error("All fields are mandatory!", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds before the toast auto closes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    try {
      const { emp_id, name, gender, email_id, phone_num, password } =
        employeeData;
      const formattedEmployeeData = {
        emp_id,
        name,
        gender,
        email_id,
        phone_num,
        password,
        // phone_num: employeeData.phone_num !== null ? parseInt(employeeData.phone_num.toString(), 10) : null,
        // emp_id: employeeData.emp_id !== null ? parseInt(employeeData.emp_id.toString(), 10) : null,
      };

      const res = await createEmployee(formattedEmployeeData);
      setEmployeeData({
        emp_id: "",
        name: "",
        gender: "",
        phone_num:"",
        email_id: "",
        password: "",
        genderOptions: ["Male", "Female", "Other"],
      });
      setShowAddForm(false);
      fetchEmployees();
      console.log("res-----------", res);
    } catch (error: any) {
      console.error("Failed to add employee------:", error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds before the toast auto closes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setEmployeeData((prevState) => ({
      ...prevState,
      gender: event.target.value,
    }));
  };
  const handleCancelSubmit = async () => {
    setEmployeeData({
      emp_id: "",
      name: "",
      gender: "",
      phone_num:"",
      email_id: "",
      password: "",
      genderOptions: ["Male", "Female", "Other"],
    });
    console.log("===", employeeData)
    toast.info("Operation cancelled!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  

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
                  Employee Details
                  <CancelIcon onClick={handleClose}></CancelIcon>
                </Typography>

                <BoxWrapper>
                  <Typography fontWeight={600}>Name:</Typography>
                  <Typography> {selectedProduct.name}</Typography>
                </BoxWrapper>

                <BoxWrapper>
                  <Typography fontWeight={600}>Email_ID:</Typography>
                  <Typography> {selectedProduct.email_id}</Typography>
                </BoxWrapper>

                <BoxWrapper>
                  <Typography fontWeight={600}>Mobile_No:</Typography>
                  <Typography> {selectedProduct.phone_num}</Typography>
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
  async function fetchEmployees() {
    const employees = await getAllEmployee();
    setPassList(employees.data);
  }
  useEffect(() => {
    fetchEmployees();
    // async function fetchOfficers() {
    //   const passes = await getAllEmployee();
    //   console.log("employee-list", passList);
    //   setPassList(passes.data);
    // }

    // fetchOfficers();
  }, []);
  console.log(passList, "passListpassListpassList");

  const columns: GridColDef[] = [
    {
      field: "ranodm_1", // confirm this
      headerName: "S.No",
      width: 140,
      valueGetter: (params: any) =>
        params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "name", headerName: "Employee Name", width: 190 },
    { field: "phone_num", headerName: "Mobile Number", width: 190 },
    {
      field: "email_id",
      headerName: "Email",
      width: 190,
    },

    {
      field: "createdAt",
      headerName: "Date",
      width: 190,
      valueFormatter: (params: any) => {
        return dayjs(params.value).format("DD-MM-YYYY");
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 190,

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
  const rowsWithSerial: any = passList.map((data: any, index) => ({
    ...data,
    serialNumber: index + 1,
  }));

  return (
    <PageContainer
      title="Employee Details"
      description="List of all the employee"
    >
      <DashboardCard title="Employee Details">
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ background: "#9C27B0" }}
              variant="contained"
              size="small"
              onClick={handleAddClick}
            >
              Add New
            </Button>
          </div>
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
                backgroundColor: "#515A5A",
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
                  // pageSize: rowsWithSerial.length,
                  // pageSize:{rowsWithSerial.length},
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

          {showAddForm && (
            <Modal
              keepMounted
              open={showAddForm}
              onClose={() => setShowAddForm(false)}
              aria-labelledby="add-employee-modal-title"
              aria-describedby="add-employee-modal-description"
            >
              <Grid container spacing={4} sx={style}>
                <Grid item xs={12} width={400}>
                  <Typography
                    sx={{
                      background: "#5d87FF",
                      color: "#fff",
                      p: 1,
                      justifyContent: "space-between",
                      display: "flex",
                      fontWeight: "700",
                      marginRight: "25px",
                      fontSize: "1.125rem",
                    }}
                  >
                    Employee Details
                    <CancelIcon onClick={handleClose}></CancelIcon>
                  </Typography>
                </Grid>
                <Box
                  sx={{
                    marginLeft: "25px",
                    width: "520px",
                    display: { xs: "block", sm: "flex", md: "flex" },
                  }}
                >
                  <Stack
                    sx={{ width: { xs: "100%", sm: "50%" }, padding: "5px" }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="name"
                      mb="5px"
                      mt="10px"
                    >
                      Employee ID
                    </Typography>
                    <CustomTextField2
                      type="text"
                      name="emp_id"
                      value={employeeData.emp_id}
                      onChange={handleInputChange}

                      variant="outlined"
                      fullWidth
                      inputProps={{ maxLength: 15 }}
                    />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="name"
                      mt="10px"
                      mb="5px"
                    >
                      Gender
                    </Typography>
                    <Select
                      value={employeeData.gender}
                      onChange={handleGenderChange}
                      style={{ height: "30px" }}
                    >
                      {employeeData.genderOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="name"
                      mb="5px"
                      mt="10px"
                    >
                      Email Id
                    </Typography>
                    <CustomTextField2
                      type="email"
                      name="email_id"
                      value={employeeData.email_id}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      error={!isEmailValid()}
                      helperText={!isEmailValid() ? 'Invalid email format' : ''}
                    />
                  </Stack>

                  <Stack
                    sx={{ width: { xs: "100%", sm: "50%" }, padding: "5px" }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="name"
                      mb="5px"
                      mt="10px"
                    >
                      Name
                    </Typography>
                    <CustomTextField2
                      type="text"
                      name="name"
                      value={employeeData.name}
                      onChange={handleInputChange}
                      inputProps={{ maxLength: 15 }}
                    />

                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="name"
                      mb="5px"
                      mt="10px"
                    >
                      Mobile
                    </Typography>

                    <CustomTextField2
                      name="phone_num"
                      value={employeeData.phone_num}
                      variant="outlined"
                      type="text"
                      onChange={handleInputChange}
                    />


                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="name"
                      mb="5px"
                      mt="10px"
                    >
                      Password
                    </Typography>
                    <CustomTextField2
                      type="password"
                      name="password"
                      value={employeeData.password}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      inputProps={{ maxLength: 15 }}
                    />
                  </Stack>
                </Box>

                <Grid item xs={12} sx={{ textAlign: "center", mt: "-20px" }}>
                  <Button
                    sx={{
                      width: "80px",
                      height: 40,
                      color: "white",
                      background: "#1976d2",
                      fontWeight: 600,
                      fontSize: "12px",
                      borderRadius: "8px",
                      margin: "4px",

                      "&:hover": { backgroundColor: "#1976d2" },
                      marginTop: "15px",
                    }}
                    onClick={() => {
                      handleAddEmployee();
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    sx={{
                      width: "80px",
                      height: 40,
                      color: "white",
                      background: "#d21919",
                      fontWeight: 600,
                      fontSize: "12px",
                      borderRadius: "8px",
                      margin: "4px",
                      "&:hover": { backgroundColor: "#d21919" },
                      marginTop: "15px",
                    }}
                    onClick={handleCancelSubmit}
                  >
                    Cancel
                  </Button>
                  <ToastContainer />
                </Grid>
              </Grid>
            </Modal>
          )}
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProductPerformance;
