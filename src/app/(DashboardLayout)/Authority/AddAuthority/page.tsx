"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import DashboardNew from "../../components/shared/DashboardNew";
import styled from "@emotion/styled";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import { useAuth } from "@/context/JWTContext/AuthContext.provider";
import { useRouter } from "next/navigation";
import CustomTextField2 from "../../components/forms/theme-elements/CustomTextField2";
const AUTHORITY_FIELDS = [
  {
    id: "vendor_name",
    fieldName: "Vendor Name",
    type: "select",
  },
  {
    id: "authority_name",
    fieldName: "Authority Name",
    type: "input",
  },
  {
    id: "status",
    fieldName: "Status",
    type: "select",
    selectOptions: ["Active", "Inactive"],
  },
  {
    id: "expiryDate",
    fieldName: "Expiry Date",
    type: "date",
  },
];

const requiredField = {
  color: "red",
  marginRight: "4px",
};

// STYLES
const ButtonWrapper = styled("div")(() => ({
  marginTop: "10px",
  textAlign: "center",
}));

const SubHeading = styled(Typography)(() => ({
  color: "#233791",
  fontWeight: 500,
  fontFamily:"Nunito",
  fontSize:"18px"
}));

const initialFieldState: any = {};
for (let arrEl of AUTHORITY_FIELDS) {
  if (!initialFieldState[arrEl.id]) initialFieldState[arrEl.id] = "";
}
let syncVendorList = 0;

const AddAuthorites = () => {
  const auth = useAuth();
  const router = useRouter();
  const [authorityFields, setAuthorityFields] = useState(initialFieldState);
  const [vendorList, setVedorList] = useState([]);
  const [associationVendor, setAssociationVendor] = useState("");
  const isVendorValid = associationVendor.trim() !== "";
  const [authorityCode, setAuthorityCode] = useState("");
  const [file, setFile] = useState<any>({});

  const handleCancelSubmit = async () => {
    for (const key in authorityFields) {
      authorityFields[key] = "";
    }

    toast.info("Operation cancelled!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        marginTop:"50px"
      },
    });
  };

  const handleAddCancel=()=>{
    setAssociationVendor("");
    toast.info("Operation cancelled!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        marginTop:"50px"
      },
    });

  }

  const handleAddVendor = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/association/create`,

        { vendor: associationVendor }
      );
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          marginTop:"50px"
        },
      });
    } catch (e: any) {
      console.log(`Error Message::::::::::`, e);
    }
    getData();
    setAssociationVendor("");
    syncVendorList += 1;
  };

  const handleAddAuthority = async () => {
    try {
      for (const field of AUTHORITY_FIELDS) {
        if (!authorityFields[field.id]) {
          toast.error("All fields are mandatory!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              marginTop:"50px"
            },
          });
          return;
        }
      }
      if (!file) {
        toast.error("Please upload a PDF file!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            marginTop:"50px"
          },
        });
        return;
      }
      if (file?.size / 1000000 > 5 || file.type !== "application/pdf") {
        toast.error(
          "File size should be less than 5MB, and it should be in PDF format!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              marginTop:"50px"
            },
          }
        );

        setFile(null);
        return;
      }
      let formData = new FormData();
      formData.append("authority_letter", file);
      for (const key in authorityFields) {
        formData.append(key, authorityFields[key]);
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/authorities/create`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = res.data;
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          marginTop:"50px"
        },
      });
      setAuthorityCode(data.authority.unique_code);
      setAuthorityFields(initialFieldState);
      setFile(null);
    } catch (error) {
      console.error("Error adding authority:", error);
    }
  };
  const handleFieldChange = (e: any) => {
    setAuthorityFields((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getData = async () => {
    const vendorArr: any = [];

    try {
      let res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/association/getAll`
      );

      setVedorList(res.data.association);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!auth.user) {
      router.push("/");
    }
  }, [auth, router]);

  return (
    <PageContainer title="Add Authorities" description="Add authorities here!">
      <DashboardNew title="Add Vendor" titleVariant="h4">
        <>
          <Box>
            <SubHeading variant="h3">Association</SubHeading>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <Typography
                  fontWeight={600}
                  component="label"
                  variant="subtitle1"
                  mb="5px"
                  sx={{fontFamily:"Nunito",}}
                  
                >
                  Vendor Name<span style={requiredField}>*</span>
                </Typography>
                <br />
                <CustomTextField
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                  name="add_vendor"
                  value={associationVendor}
                  onChange={(e: any) => setAssociationVendor(e.target.value)}
                  sx={{ width: "100%", }}
                />{" "}
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleAddVendor}
                  disabled={!isVendorValid}
                  sx={{ mt: "25px" }}
                >
                  ADD
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    marginLeft: "10px",
                    backgroundColor: "#d21919",
                    mt: "25px",
                    "&:hover": { backgroundColor: "#d21919" },

                  }}
                  onClick={handleAddCancel}

                >
                  Cancel
                </Button>
                <ToastContainer />
              </Grid>
            </Grid>
          </Box>
          <Divider
            role="presentation"
            variant="middle"
            sx={{ marginTop: "25px",marginBottom: "10px" }}
          />
          <Box mt="15px">
            <SubHeading variant="h3">Add Authorities</SubHeading>

            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "flex",
                  md: "flex",
                },
              }}
            >
              <Grid container spacing={2}>
                {AUTHORITY_FIELDS.map((field, i) => (
                   <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Fragment key={field.id}>
                      <Typography
                        fontWeight={600}
                        component="label"
                        variant="subtitle1"
                        sx={{fontFamily:"Nunito"}}
                      >
                        {field.fieldName}
                        <span style={requiredField}>*</span>
                      </Typography>
                      <br />
                      {field.type === "select" ? (
                        <Select
                          style={{ height: "30px", width: "100%" }}
                          name={field.id}
                          value={Object.values(authorityFields)[i]}
                          onChange={handleFieldChange}
                          MenuProps={{
                            style: { maxHeight: "600px", overflowY: "auto" },
                          }}
                        >
                          {field.id === "vendor_name"
                            ? vendorList.map((ven: any, i: any) => (
                                <MenuItem key={ven._id} value={ven.vendor}>
                                  {ven.vendor}
                                </MenuItem>
                              ))
                            : field?.selectOptions?.map((option, i) => (
                                <MenuItem
                                  key={`${field.id}+${i}`}
                                  value={option}
                                >
                                  {option}
                                </MenuItem>
                              ))}
                        </Select>
                      ) : (
                        <CustomTextField
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          type={field.type}
                          name={field.id}
                          value={Object.values(authorityFields)[i]}
                          onChange={handleFieldChange}
                          sx={{ width: "100%" ,}}
                        />
                      )}
                    </Fragment>
                  </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Fragment>
                    <Typography
                      fontWeight={600}
                      component="label"
                      variant="subtitle1"
                      sx={{fontFamily:"Nunito"}}
                    >
                      Authority Letter
                      <span style={requiredField}>*</span>
                    </Typography>
                    <CustomTextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      type="file"
                      name="authority_letter"
                      onChange={(e: any) => setFile(e.target.files[0])}
                      sx={{ width: "100%", }}
                    />
                  </Fragment>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    sx={{
                      mt: "25px",
                    }}
                    onClick={handleAddAuthority}
                  >
                    GET
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mt: "25px",
                      ml: "10px",
                      background: "#d21919",
                      "&:hover": { backgroundColor: "#d21919" },
                    }}
                    onClick={handleCancelSubmit}
                  >
                    Cancel
                  </Button>
                   <ToastContainer />
                </Grid>

              </Grid>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Box
                  mt="25px"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    fontWeight={700}
                    sx={{
                      border: "2px solid #556cd6",
                      color: "#556cd6",
                      padding: "9px",
                      borderRadius: "4px",
                      fontFamily:"Nunito"
                    }}
                  >
                    {authorityCode
                      ? `Code: ${authorityCode}`
                      : "Enter details to generate code"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      </DashboardNew>
    </PageContainer>
  );
};

export default AddAuthorites;
