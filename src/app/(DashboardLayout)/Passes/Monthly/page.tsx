"use client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, TextField, TextareaAutosize } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import CustomTextField2 from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField2";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { format } from "date-fns";
import { createMonthlyPass, getAllVendors, getPassData } from "@/utils/api";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TakePhotoM from "../../components/webcam/takePhotoMonthly";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import CustomModalMonthly from "../../components/CustomModal/CustomModalMonthly";
import AddressTextArea from "../../components/forms/theme-elements/AddressTextArea";
import CustomTextArea from "../../components/forms/theme-elements/CustomTextArea";
import CustomModal from "../../components/CustomModal/CustomModal";

const defaultValue = {
  mobile: "",
  name: "",
  gender: "",
  unique_id_type: "",
  unique_id: "",
  address: "",
  designation: "",
  vendorName: "",
  authorityCode: "",
  passFrom: new Date().toISOString().substring(0, 10),
  passTo: new Date().toISOString().substring(0, 10),
  purpose: "",
};

const requiredField = {
  color: "red",
  marginRight: "4px",
};

const ModalFieldWrapper = styled(Box)(() => ({
  display: "flex",
  marginBottom: "5px",
  "& > *": {
    fontSize: "12px",
  },
}));

const Dashboard = () => {
  const [form, setForm] = useState<any>(defaultValue);
  const [open, setOpen] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [picture, setPicture] = useState("");
  const [modalState, setModalState] = useState(false);
  const [passData, setPassData] = useState<any>({});
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const onValueChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "unique_id_type") {
      setForm({ ...form, [name]: value, unique_id: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const regExp = /^[a-z A-Z0-9]*$/;
  const RegExpNum = /^[0-9]*$/;
  const regExpdir = /^[a-z A-Z0-9]*$/;

  const validateInput = (inputLimit: any, selectedType: any) => {
    switch (selectedType) {
      case "Aadhar Card":
        return inputLimit.length <= 12 && RegExpNum.test(inputLimit);
      case "Voter ID":
        return inputLimit.length <= 10 && regExp.test(inputLimit);
      case "Pan Card":
        return inputLimit.length <= 10 && regExp.test(inputLimit);
      case "Photo ID":
        return inputLimit.length <= 15 && regExp.test(inputLimit);
      case "Passport":
        return inputLimit.length <= 12 && regExp.test(inputLimit);
      case "Driving License":
        return inputLimit.length <= 15 && regExpdir.test(inputLimit);
      default:
        return true;
    }
  };

  const alldata = async () => {
    const data = await getAllVendors();
    setVendors(data?.data);
    console.log(data?.data, "data");
  };

  function formatDate(date: string) {
    return format(new Date(date), "yyyy-MM-dd");
  }

  const searchData = async (param: any) => {
    const res = await getPassData(param);
    if (res?.allData) {
      setForm({
        ...res?.allData,
        passFrom: formatDate(res?.allData.passFrom),
        passTo: formatDate(res?.allData.passTo),
      });
    } else if (!res?.allData?.name) {
      window.alert(res);
      setForm(defaultValue);
    }
  };

  const auth = () => {
    const newData: any = vendors?.filter((p: any) => {
      return p.vendor_name === form.vendorName;
    });

    setForm({ ...form, authorityCode: newData[0]?.unique_code});
    setForm({ ...form, authorityCode: newData[0]?.unique_code, passTo:newData[0]?.expiryDate.substring(0, 10)});

  };

  useEffect(() => {
    alldata();
  }, []);

  useEffect(() => {
    auth();
  }, [form.vendorName]);

  



  const handleSubmit = async () => {
    // Check if all required fields are filled
    for (const key in form) {
      if (!form[key] || !picture) {
        // If any required field is empty, display an error or handle it accordingly
        console.log(`Please fill in ${key}`);
        toast.error('All fields are mandatory!', {
          position:'top-right',
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

    try{

      const res = await createMonthlyPass({ ...form, picture: picture });
      setForm(defaultValue);
      setPicture("");
      console.log(res, "Montly pass created successfully.");
    if (res?.historyData) {
      const { historyData } = res;
      setModalState(true);
      setPassData(historyData);
    }
   toast.success(res.message, {

        position:'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          marginTop:"50px"
        },
      });
    }catch(error){

      toast.error("Error in creating pass!", {

        position:'top-right',
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
  
   
  
   
  };

  const handleCancelSubmit=async () => {
    setForm(defaultValue);
    toast.info('Operation cancelled!', {
      position: 'top-right',
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
  




  const submit = {
    width: 172,
    height: 48,
    color: "white",
    background: "#E15A11",
    fontWeight: 600,
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <>

      <DashboardCard title="Monthly Pass">

        <Box sx={{ marginTop: "0px", paddingBottom: "0px", width: "100%" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ display: "flex", width: "100%", marginTop: "40px" }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6}>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="name"
                        >
                          Name<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                      <CustomTextField2 id="name" variant="outlined" fullWidth name="name" value={form.name} onChange={(e: any) => {
                      if (e.target.value.toString().length <= 50) {
                        setForm({ ...form, [e.target.name]: e.target.value });
                      }
                    }} />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="name"
                        >
                          Mobile Number<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ paddingLeft: "2px" }}>
                      <CustomTextField2
                      name="mobile"
                      value={form.mobile}
                      variant="outlined"
                      fullWidth
                      type="text"
                      onChange={(e: any) => {
                        const newValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                        if (newValue.length <= 10) {
                          setForm({ ...form, [e.target.name]: newValue });
                        }
                      }}
                    />
                        <Button
                          sx={{
                            width: { xs: "5%", sm: "5%", md: "5%" },
                            height: "20px",
                            fontWeight: 600,
                            fontSize: "12px",
                            borderRadius: "8px",
                            marginTop: "2px",
                          }}
                          onClick={() => searchData(form.mobile)}
                        >
                          <SearchIcon /> search
                        </Button>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="status"
                        >
                          Gender<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      {/* <CustomTextField2 id="status" variant="outlined" fullWidth /> */}
                      <Box sx={{ marginLeft: "10px" }}>
                        <Select name="gender" placeholder="Select Gender" value={form.gender} onChange={(e: any) => onValueChange(e)} style={{ height: "40px", width: "325px" }} inputProps={{ "aria-label": "Without label" }}>
                      
                          <MenuItem disabled value="">
                            <em>Select Gender</em>
                          </MenuItem>

                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="status"
                        >
                          Unique ID Type<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <Select
                          style={{ height: "40px", width: "325px" }}
                          value={form.unique_id_type}
                          onChange={(e: any) => onValueChange(e)}
                          name="unique_id_type"
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem disabled value="">
                            <em>ID Proof</em>
                          </MenuItem>
                          <MenuItem value="Aadhar Card">
                            Aadhar Card / VID of Aadhar Card
                          </MenuItem>
                          <MenuItem value="Voter ID">Voter ID </MenuItem>
                          <MenuItem value="Pan Card">Pan Card</MenuItem>
                          <MenuItem value="Driving License">
                            Driving License
                          </MenuItem>
                          <MenuItem value="Photo ID issued By Central/State Goverment">
                            Photo ID issued By Central/State Goverment
                          </MenuItem>
                          <MenuItem value="Passport">Passport</MenuItem>
                        </Select>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="name"
                        >
                          Unique ID Number<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <CustomTextField2
                          name="unique_id"
                          variant="outlined"
                          // fullWidth
                          value={form.unique_id}
                          onChange={(e: any) => {
                            const inputLimit = e.target.value;
                            if (
                              validateInput(inputLimit, form.unique_id_type)
                            ) {
                              setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                              });
                            }
                          }}
                          // disabled={!unique_id_type}
                          inputProps={{ maxLength: 15 }}
                        />
                      </Box>
                    </Box>
                   
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="status"
                        >
                          Associate With<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <Select
                          name="vendorName"
                          value={form.vendorName}
                          onChange={(e: any) => {
                            setForm({ ...form, vendorName: e.target.value });
                          }}
                          style={{ height: "40px", width: "325px" }}
                          inputProps={{ "aria-label": "Without label" }}
                          MenuProps={{
                            style: { maxHeight: "600px", overflowY: 'auto' } // Set the max height and add a scrollbar
                          }}
                        >
                          <MenuItem disabled value="">
                            <em>Reporting Officer</em>
                          </MenuItem>
                          {vendors?.map((ven: any, id: any) => (
                            <MenuItem key={id} value={ven.vendor_name}>
                              {ven.vendor_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="location"
                        >
                          Pass Valid From<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <CustomTextField2
                          type="date"
                          name="passFrom"
                          value={form.passFrom}
                          
                          // onChange={(e: any) => onValueChange(e)}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="location"
                        >
                          Pass Valid To<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <CustomTextField2
                          type="date"
                          name="passTo"
                          value={form.passTo}
                          // onChange={(e: any) => onValueChange(e)}
                        />
                      </Box>
                    </Box>
                 
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="location"
                        >
                          Purpose Of Visiting{" "}
                          <span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <Select
                          name="purpose"
                          value={form.purpose}
                          onChange={(e: any) => onValueChange(e)}
                          style={{ height: "40px", width: "325px" }}
                          inputProps={{ "aria-label": "Without label" }}
                          
                        >
                          <MenuItem disabled value="">
                            <em>ID Proof</em>
                          </MenuItem>
                          <MenuItem value="Casual Work">Casual Work</MenuItem>
                          <MenuItem value="CPWD">CPWD</MenuItem>
                          <MenuItem value="Housekeeping">
                            House Keeping
                          </MenuItem>
                          <MenuItem value="Hindi Training">
                            Hindi Training
                          </MenuItem>
                          <MenuItem value="On Duty">On Duty</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box
                        sx={{
                          width: "220px",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="location"
                        >
                          Designation<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <CustomTextField2
                          id="location"
                          variant="outlined"
                          // fullWidth

                          name="designation"
                          value={form.designation}
                          onChange={(e: any) => onValueChange(e)}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box
                        sx={{
                          width: "220px",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="location"
                        >
                          Authority<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <CustomTextField2
                          id="location"
                          variant="outlined"
                          // fullWidth

                          name="designation"
                          value={form.authorityCode}
                          onChange={(e: any) => onValueChange(e)}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="location"
                        >
                          Address<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                      <TextField
                          sx={{ width: "325px" }}
                          multiline
                          rows={3}
                          inputProps={{ maxLength: 550 }}id="location"  name="address" value={form.address} onChange={(e: any) => onValueChange(e)} />

                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={8} md={6}>
                  <TakePhotoM
                    open={open}
                    handleClose={() => setOpen(false)}
                    setPicture={setPicture}
                    setOpen={setOpen}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  width: "100px",
                  height: 50,
                  color: "white",
                  background: "#1976d2",
                  fontWeight: 600,
                  fontSize: "12px",
                  borderRadius: "8px",
                  margin:"4px",

                  "&:hover": { backgroundColor: "#1976d2" },
                  marginTop: "15px",

                }}
                onClick={handleSubmit}
              >
                Save & Print
              </Button>
              <Button
                sx={{
                  width: "100px",
                  height: 50,
                  color: "white",
                  background: "#d21919",
                  fontWeight: 600,
                  fontSize: "12px",
                  borderRadius: "8px",
                  margin:"4px",
                  "&:hover": { backgroundColor: "#d21919" },
                  marginTop: "15px",
                }}
                onClick={handleCancelSubmit}
              >
                Cancel
              </Button>
              <ToastContainer />

            </Box>
          </Grid>
        </Box>
        </DashboardCard>
        <CustomModalMonthly
          modalState={modalState}
          setModalState={setModalState}
        >
          <Grid sx={{ width: "100%", marginTop: "30px" }}>
            <Box sx={{ display: "flex" }}>
              <img
                style={{ width: "22%", border: "1px solid grey" }}
                src={passData.qr_code}
              />
              <Typography sx={{ fontSize: "8px" }}>
                पास संख्या/ Pass No.:{" "}
                <span style={{ fontSize: "9px", fontWeight: "bold" }}>
                  {passData.passNumber}
                </span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontSize: "8px" }}>
                  Valid From:{" "}
                  <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {dayjs(passData.passFrom).format("DD/MM/YYYY")}
                  </span>
                </Typography>
                <Typography sx={{ fontSize: "8px" }}>
                  Valid Upto:{" "}
                  <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {dayjs(passData.passTo).format("DD/MM/YYYY")}
                  </span>
                </Typography>
              </Box>
              {/* <Typography sx={{ fontSize: "8px" }}></Typography> */}
            </Box>
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                columnGap: "0px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                {/* <Typography sx={{ fontSize: "8px" }}>पास संख्या/ Pass No.:</Typography> */}
                {/* <Typography sx={{ fontSize: "8px" }}>Valid From:</Typography>
                        <Typography sx={{ fontSize: "8px" }}>Valid Upto:</Typography> */}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* <Typography sx={{ fontSize: "10px", marginLeft: "-24px" }}>{passData.passNumber}</Typography> */}
                {/* <Typography sx={{ fontSize: "10px", marginLeft: "-40px" }} variant="subtitle1" fontWeight="bold">
                          {dayjs(passData.passFrom).format("DD/MM/YYYY")}
                        </Typography>
                        <Typography sx={{ fontSize: "10px", marginLeft: "-40px" }} variant="body1" fontWeight="bold">
                          {dayjs(passData.passTo).format("DD/MM/YYYY")}
                        </Typography> */}
              </div>
              {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                          <img style={{ width: "100%", height: "auto", border: '1px solid grey', padding: '5px' }} src={passData.picture} alt="Pass Picture" />
                        </Box>
                      </div> */}
            </section>
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                columnGap: "0px",
                textAlign: "left",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "8px" }}>नाम/ Name:</Typography>
              </Box>
              <div>
                <Typography
                  sx={{ fontSize: "10px", lineHeight: "0.743rem" }}
                  variant="body1"
                  fontWeight="bold"
                >
                  {passData.name}
                </Typography>
              </div>
            </section>
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                columnGap: "0px",
                textAlign: "left",
              }}
            >
              <div>
                <Typography sx={{ fontSize: "8px" }}>लिंग/ Gender:</Typography>
                <Typography sx={{ fontSize: "8px" }}>
                  मोबाइल/ Mobile:
                </Typography>
                <Typography sx={{ fontSize: "8px" }}>
                  पद/ Designation:
                </Typography>
                <Typography sx={{ fontSize: "8px" }}>
                  उद्देश्य/ Purpose:
                </Typography>
                <Typography sx={{ fontSize: "8px", lineHeight: "0.9rem" }}>
                  संबंधित/
                  <br />
                  Associated With:
                </Typography>
              </div>
              <div>
                <Typography sx={{ fontSize: "8px" }}>
                  {passData.gender}
                </Typography>
                <Typography sx={{ fontSize: "8px" }}>
                  {passData.mobile}
                </Typography>
                <Typography
                  sx={{ fontSize: "10px" }}
                  variant="body1"
                  fontWeight="bold"
                >
                  {passData.designation}
                </Typography>
                <Typography sx={{ fontSize: "10px" }}>
                  {passData.purpose}
                </Typography>
                <Typography sx={{ fontSize: "10px" }}>
                  {passData.vendorName}
                </Typography>
              </div>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "-23px",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "80%",
                    border: "1px solid grey",
                    padding: "0px",
                  }}
                  src={passData.picture}
                  alt="Pass Picture"
                />
              </Box>
            </section>
            <Box
              sx={{
                display: "flex-start",
                textAlign: "start",
                fontSize: "10px",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              Signature of Holder
            </Box>
            <Box
              sx={{
                display: "flex-end",
                textAlign: "end",
                fontSize: "10px",
                marginTop: "-64px",
                marginBottom: "20px",
                lineHeight: "0.9rem",
              }}
            >
              Signature <br />
              (Issuing Authority / Officer)
              <br />
              Reg. Date:{" "}
              {dayjs(passData.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </Box>
          </Grid>
        </CustomModalMonthly>
      </>
    </PageContainer>
  );
};
export default Dashboard;

const submit = {
  width: 172,
  height: 48,
  color: "white",
  background: "#E15A11",
  fontWeight: 600,
  fontSize: "14px",
  "&:hover": { backgroundColor: "#1976d2" },
};

const Photo = {
  width: 172,
  height: 48,
  color: "white",
  background: "#5D87FF",
  fontWeight: 600,
  fontSize: "14px",
  "&:hover": { backgroundColor: "#1976d2" },
  px: 2,
};
