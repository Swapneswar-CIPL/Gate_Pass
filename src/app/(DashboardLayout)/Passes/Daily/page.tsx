"use client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Divider, Grid, TextField } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";

import CustomTextField2 from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField2";
import CustomTextArea from "../../components/forms/theme-elements/CustomTextField2";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import TakePhoto from "../../components/webcam/takePhoto";
import axios from "axios";
import { createDailyPass, getDailyPassDetails } from "@/utils/api";
import Image from "next/image";
import imgBanner from "public/Gov_Logo_912e861f02.png";
import dayjs from "dayjs";
import CustomModal from "../../components/CustomModal/CustomModal";
import AddressTextArea from "../../components/forms/theme-elements/AddressTextArea";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Height, WidthFull } from "@mui/icons-material";
import { StaticImageData } from "next/image";
import icon4 from "public/icon4.png";
import icon5 from "public/icon5.png";
import icon6 from "public/icon6.png";
import icon7 from "public/icon7.png";
import icon3 from "public/icon3.png";
import icon8 from "public/icon8.png";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";


interface FormField {
  name: string;
  showRemoveButton: boolean;
}

const requiredField = {
  color: "red",
  marginRight: "4px",
};

const ps = {
  lineHeight: "0.54rem",
};

const nameRegExp = /^[a-z A-Z]*$/;

const Dashboard = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    { name: "", showRemoveButton: false },
  ]);
  const [open, setOpen] = useState(true);
  const [mobile_num, setMobile_num] = useState("");
  const [formattedNames, setFormattedNames] = useState<string[]>([]);
  const [gender, setGender] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [unique_id_type, setUnique_id_type] = useState("");
  const [building_room_num, setBuilding_room_num] = useState("");
  const [reporting_officer, setReporting_officer] = useState("");
  const [address, setAddress] = useState("");
  const [message_and_purpose, setMessage_and_purpose] = useState("");
  const [material, setMaterial] = useState("");
  const [vendor, setVendor] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [passData, setPassData] = useState<any>({});
  const [picture, setPicture] = useState("");
  const [messageConveyedBy, setMessageConveyedBy] = useState("");


  useEffect(() => {
    console.log("ssssssssssssssssssssss", picture);
    var options = {
      method: "GET",
      url:`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/officers/getAll`,
      headers: {},
    };

    axios
      .request(options)
      .then(function (response) {
        setVendor(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleChange1 = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;
    if (name.length <= 50 && nameRegExp.test(name)) {
      const updatedFields = [...formFields];
      updatedFields[index].name = event.target.value;
      setFormFields(updatedFields);
    }
  };

  const addFieldName = () => {
    if (formFields.length < 5) {
      setFormFields([...formFields, { name: "", showRemoveButton: true }]);
    }
  };

  const handleRemove = (index: number) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleReportingOfficer = (e: any) => {
    const ReportValue = e.target.value;
    setReporting_officer(ReportValue);
    const details: any = vendor.filter(
      (vendor: any) => vendor.officer_name === ReportValue
    );
    setBuilding_room_num(details[0].building_room_num);
  };

  const handledchanged = (event: any) => {
    const selectedType = event.target.value;
    setUnique_id_type(selectedType);
    setUnique_id("");
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

  const searchData = async (param: any) => {
    const res = await getDailyPassDetails(param);
    console.log("res-----------",res);
    if (res?.allData) {
      delete res?.alldata?.__v;
      delete res?.allData?._id;
      const data: any = res.allData;
      console.log("message------------", data.messageConveyedBy)
      console.log("DATAAAAAAAAAAA------------", data)

      setFormFields([
        { name: data.formattedNames[0], showRemoveButton: false },
      ]);
      setGender(data.gender);
      setUnique_id(data.unique_id);
      setUnique_id_type(data.unique_id_type);
      setReporting_officer(data.reporting_officer);
      setBuilding_room_num(data.building_room_num);
      setAddress(data.address);
      setMaterial(data.material);
      setMessage_and_purpose(data.message_and_purpose);
      setMessageConveyedBy(data.messageConveyedBy)
    } else if (!res?.allData?.name) {
      setFormFields([{ name: "", showRemoveButton: false }]);
      setGender("");
      setUnique_id("");
      setUnique_id_type("");
      setReporting_officer("");
      setBuilding_room_num("");
      setAddress("");
      setMaterial("");
      setMessage_and_purpose("");
      setMessageConveyedBy("");
      alert("No Data Found");
    }
  };

  const maskUniqueId = (uniqueId: string) => {
    if (uniqueId?.length < 4) {
      return uniqueId;
    }

    const lastFourDigits = uniqueId?.slice(-4);
    const maskedPart = "X".repeat(uniqueId?.length - 4);

    return maskedPart + lastFourDigits;
  };

 
const handleCancelSubmit=async () => {
  
  setMobile_num("");
  setFormFields([{ name: "", showRemoveButton: false }]);
  setUnique_id("");
  setUnique_id_type("");
  setGender("");
  setReporting_officer("");
  setBuilding_room_num("");
  setAddress("");
  setMessage_and_purpose("");
  setMessageConveyedBy("");
  setMaterial("");
  setPicture("");
  setOpen(true);
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

  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (
      !mobile_num ||
      !formattedNames ||
      !unique_id ||
      !unique_id_type ||
      !gender ||
      !reporting_officer ||
      !building_room_num ||
      !address ||
      !material ||
      !message_and_purpose ||
      !messageConveyedBy ||
      !picture
    ) {
      // If any required field is empty, display an error or handle it accordingly
      console.log("Please fill all the required fields");
      // alert("All fields are mandatory!")
      
      toast.error('All fields are mandatory!', {
        position:'top-right',
         autoClose: 3000, // Time in milliseconds before the toast auto closes
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
  
    const formData = {
      mobile_num,
      formattedNames,
      unique_id,
      unique_id_type,
      gender,
      reporting_officer,
      building_room_num,
      address,
      material,
      message_and_purpose,
      messageConveyedBy,
      picture,
    };
    console.log("before api--------", formData);
  
    try {
      const res = await createDailyPass(formData);
      console.log("res---------", res);
      setMobile_num("");
      setFormFields([{ name: "", showRemoveButton: false }]);
      setUnique_id("");
      setUnique_id_type("");
      setGender("");
      setReporting_officer("");
      setBuilding_room_num("");
      setAddress("");
      setMessage_and_purpose("");
      setMessageConveyedBy("");
      setMaterial("");
      setPicture("");
      setModalState(true);
      setPassData(formData);
      toast.success(res.message, {

        position:'top-right',
        autoClose: 3000, // Time in milliseconds before the toast auto closes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          marginTop:"50px"
        },
      });
    } catch (error) {
      // Handle API call error
      // alert(error)
      toast.error("Error in creating pass!", {

        position:'top-right',
        autoClose: 3000, // Time in milliseconds before the toast auto closes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          marginTop:"50px"
        },
      });
      console.error("Error submitting form:", error);
    }
  };
  

  useEffect(() => {
    const namesArray = formFields.map((field, index) => {
      const firstSpaceIndex = field.name.indexOf(" ");
      const firstName =
        firstSpaceIndex !== -1
          ? field.name.slice(0, firstSpaceIndex + 1)
          : field.name;
      const restOfName =
        firstSpaceIndex !== -1 ? field.name.slice(firstSpaceIndex + 1) : "";
      return `${firstName}${restOfName.replace(/\s/g, "")}`;
    });
    setFormattedNames(namesArray);
  }, [formFields]);

  useEffect(() => {
    console.log("pictureeew", picture);
  }, [picture]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <>

      <DashboardCard title="Daily Pass">

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
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="location"
                        >
                          Name
                          <span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {formFields.map((field, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              padding: "2px",
                              width: "325px",
                              // margi0Left: "50px",
                            }}
                          >
                            <CustomTextField2
                              value={field.name}
                              height="100px"
                              variant="outlined"
                              name={field.name}
                              onChange={(event: any) =>
                                handleChange1(index, event)
                              }
                            />
                            {field.showRemoveButton && (
                              <Button
                                style={{ width: "20px" }}
                                onClick={() => handleRemove(index)}
                                variant="contained"
                                color="error"
                                size="small"
                              >
                                <RemoveCircleOutlineIcon fontSize="small" />
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button
                          sx={{
                            width: { xs: "5%", sm: "5%", md: "5%" },
                            height: "20px",
                            fontWeight: 600,
                            fontSize: "12px",
                            borderRadius: "8px",
                            marginTop: "2px",
                          }}
                          variant="contained"
                          color="success"
                          onClick={addFieldName}
                        >
                          <PersonAddAlt1Icon />
                        </Button>
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
                          name="mobile_num"
                          value={mobile_num}
                          variant="outlined"
                          type="text"
                          onChange={(e: any) => {
                            if (/^\d{0,10}$/.test(e.target.value)) {
                              setMobile_num(e.target.value);
                            }
                          }}
                        />
                        {/* <Button
                        sx={{ marginTop: "0px" }}
                        onClick={() => searchData(mobile_num)}
                      >
                        <SearchIcon /> search
                      </Button> */}
                        <Button
                          sx={{
                            width: { xs: "5%", sm: "5%", md: "5%" },
                            height: "20px",
                            fontWeight: 600,
                            fontSize: "12px",
                            borderRadius: "8px",
                            marginTop: "2px",
                          }}
                          onClick={() => searchData(mobile_num)}
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
                        <Select
                          name="status"
                          value={gender}
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e: any) => handleGenderChange(e)}
                          style={{ height: "40px", width: "325px" }}
                        >
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
                          value={unique_id_type}
                          onChange={handledchanged}
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
                          value={unique_id}
                          onChange={(e: any) => {
                            const inputLimit = e.target.value;
                            if (validateInput(inputLimit, unique_id_type)) {
                              setUnique_id(inputLimit);
                            }
                          }}
                          disabled={!unique_id_type}
                          inputProps={{ maxLength: 15 }}
                        />
                      </Box>
                    </Box>
                  
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        {" "}
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="status"
                        >
                          Host Officer<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      {/* <CustomTextField2 id="status" variant="outlined" fullWidth /> */}
                      <Box sx={{ marginLeft: "10px" }}>
                        <Select
                          name="reportstatus"
                          inputProps={{ "aria-label": "Without label" }}
                          value={reporting_officer}
                          style={{ height: "40px", width: "325px" }}
                          onChange={(e) => handleReportingOfficer(e)}
                          MenuProps={{
                            style: { maxHeight: "600px", overflowY: 'auto' } // Set the max height and add a scrollbar
                          }}
                        >
                          <MenuItem disabled value="">
                            <em>Host Officer</em>
                          </MenuItem>
                          {vendor.map((option: any, index) => (
                            <MenuItem
                              key={option._id}
                              value={option.officer_name}
                            >
                              {option.officer_name}
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
                          Message Conveyed By
                          <span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <CustomTextField2
                          value={messageConveyedBy}
                          width="80%"
                          variant="outlined"
                          // fullWidth
                          name={messageConveyedBy}
                          onChange={(event: any) =>
                            setMessageConveyedBy(event.target.value)
                          }
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
                        <TextField
                          sx={{ width: "325px" }}
                          multiline
                          rows={3}
                          inputProps={{ maxLength: 550 }}
                          name="location"
                          value={message_and_purpose}
                          onChange={(e: any) => {
                            if (e.target.value.length <= 300) {
                              setMessage_and_purpose(e.target.value);
                            }
                          }}
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
                          Building Room Number<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <CustomTextField2
                          id="location"
                          variant="outlined"
                          // fullWidth
                          disabled
                          name="location"
                          value={building_room_num}
                          onChange={(e: any) => {
                            setBuilding_room_num(e.target.value);
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", padding: "10px" }}>
                      <Box sx={{ width: "220px" }}>
                        {" "}
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="location"
                        >
                          Vehicle No./Material:<span style={requiredField}>*</span>
                        </Typography>
                      </Box>
                      <Box sx={{ marginLeft: "10px" }}>
                        <CustomTextArea
                          id="location"
                          variant="outlined"
                          // fullWidth
                          name="location"
                          value={material}
                          onChange={(e: any) => {
                            setMaterial(e.target.value);
                          }}
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
                          value={address}
                          inputProps={{ maxLength: 550 }}
                          onChange={(e: any) => {
                            if (e.target.value.length <= 550) {
                              setAddress(e.target.value);
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={8} md={6}>
                  <TakePhoto
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
                // color="error"
              >
                Cancel
              </Button>
              <ToastContainer />

            </Box>
          </Grid>
        </Box>
        </DashboardCard>

        <CustomModal
          modalState={modalState}
          setModalState={setModalState}
          modalWidth="800px"
          altBtnText="Print"
          altBtnFn={() => window.print()}
        >

          <Box sx={{ width: "600px", padding: "10px" }}>
            <Grid container xs={12} sx={{}}>
              <Grid item xs={8} sx={{ paddingRight: "10px" }}>
                <Grid item xs={8}>
                  <Box>

                    <Typography sx={{}} fontWeight="bold">
                      {" "}
                      दैनिक आगंतुक पास/ Daily Visitor Pass
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        marginTop: "5px",
                        display: "flex",
                        height: "14px",
                        alignItems: "center",
                      }}
                      fontWeight="bold"
                    >
                      <img src={icon6.src} alt="Icon 6" height="15px" />
                      &nbsp; पास संख्या/ Pass No.:
                      <span style={{ marginLeft: "15px" }}>
                        {passData.passNumber}
                      </span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={4}></Grid>

                <Grid container xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "12px",
                      display: "flex",
                      marginTop: "7px",
                      borderBottom: "1px dashed #333",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <img src={icon4.src} alt="Icon 03" height="14px" />
                    &nbsp;
                    <Typography sx={{ fontSize: "10px" }} fontWeight="bold">
                      आगंतुक विवरण/ Visitor Details
                    </Typography>
                  </Box>
                </Grid>

                <Grid container xs={12}>
                  <Grid xs={5} sx={{ marginTop: "10px" }}>
                    <Box>
                      <Typography
                        sx={{ fontSize: "10px", lineHeight: "0.54rem" }}
                      >
                        नाम/ Name:
                      </Typography>
                      <Typography sx={{ fontSize: "10px" }}>
                        {passData?.formattedNames &&
                          passData.formattedNames.length > 0 && (
                            <Typography
                              sx={{ fontSize: "12px", lineHeight: "0.964rem" }}
                              fontWeight="bold"
                            >
                              {passData.formattedNames.join(", ")}
                            </Typography>
                          )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4} sx={{ marginTop: "10px" }}>
                    <Typography
                      sx={{ fontSize: "10px", lineHeight: "0.54rem" }}
                    >
                      लिंग/ Gender:
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }} fontWeight="bold">
                      {passData.gender}
                    </Typography>
                  </Grid>
                  <Grid xs={3} sx={{ marginTop: "10px" }}>
                    <Box>
                      <Typography
                        sx={{ fontSize: "10px", lineHeight: "0.54rem" }}
                      >
                        मोबाइल/ Mobile:
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }} fontWeight="bold">
                        {passData.mobile_num}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container xs={12} sx={{ marginTop: "10px" }}>
                  <Grid xs={5}>
                    <Box>
                      <Typography
                        sx={{ fontSize: "10px", lineHeight: "0.54rem" }}
                      >
                        आईडी विवरण/ ID Details:
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }} fontWeight="bold">
                        {passData.unique_id_type}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid xs={4}>
                    <Box>
                      <Typography
                        sx={{ fontSize: "10px", lineHeight: "0.54rem" }}
                      >
                        आईडी नं/ ID No.:
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }} fontWeight="bold">
                        {maskUniqueId(passData.unique_id)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid container xs={12}>
                    <Box
                      sx={{
                        width: "100%",
                        padding: "0px 0px",
                        marginTop: "8px",
                        borderBottom: "1px dashed #333",
                        marginBottom: "5px",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <img src={icon5.src} alt="Icon 05" height="14px" />
                      &nbsp;
                      <Typography fontWeight="bold" sx={{ fontSize: "10px" }}>
                        मिलने के लिए/ To Meet
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid container xs={12}>
                    <Grid xs={5}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "10px", lineHeight: "0.8rem" }}
                        >
                          अनुरोध करने वाले अधिकारी का नाम
                          <br />
                          Host Officer Name:
                        </Typography>
                        <Typography
                          sx={{ marginBottom: "18px", fontSize: "12px" }}
                          fontWeight="bold"
                        >
                          {passData.reporting_officer}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={4}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "10px", lineHeight: "0.8rem" }}
                        >
                          कमरा नं./भवन
                          <br />
                          Room No./ Building:
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }} fontWeight="bold">
                          {passData.building_room_num}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={2}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "10px", lineHeight: "0.8rem" }}
                        >
                          उ्देश्य/
                          <br />
                          Purpose:
                        </Typography>
                        <Typography
                          sx={{ fontSize: "12px" }}
                          variant="body1"
                          fontWeight="bold"
                        >
                          {passData.message_and_purpose}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container xs={12}>
                    <Grid xs={5}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "10px", lineHeight: "0.8rem" }}
                        >
                          Message Conveyed By:
                        </Typography>
                        <Typography
                          sx={{ marginBottom: "18px", fontSize: "12px" }}
                          fontWeight="bold"
                        >
                          {passData.messageConveyedBy}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={4}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "10px", lineHeight: "0.8rem" }}
                        >
                          Vehicle No. / Material:
                        </Typography>
                        <Typography
                          sx={{ marginBottom: "18px", fontSize: "12px" }}
                          fontWeight="bold"
                        >
                          {passData.material}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container xs={12}>
                    <Grid xs={4}>
                      <Typography
                        sx={{ fontSize: "10px", marginTop: "65px" }}
                        fontWeight="bold"
                      >
                        Exit Time: _________
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography
                        sx={{
                          fontSize: "9px",
                          marginBottom: "20px",
                          marginTop: "40px",
                          lineHeight: "0.8rem",
                          textAlign: "center",
                        }}
                        fontWeight="bold"
                      >
                        जारीकर्ता प्राधिकारी/अधिकारी के हस्ताक्षर और मुहर <br />
                        Signature Seal of Issuing Authority / Officer <br />
                        Reg. Date:{" "}
                        {dayjs(passData.createdAt).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )}
                      </Typography>
                      {/* <Typography sx={{ fontSize: "10px", marginTop: '2px', display: 'flex', height: '13px', alignItems: 'center' }} fontWeight="bold" >
                        <img src={icon8.src} alt="Icon 06" height="12px" />
                        &nbsp; Reg. Date: {dayjs(passData.createdAt).format(" DD/MM/YYYY")}<br />
                      </Typography> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* END LEFT SIDE DIV */}
              <Grid xs={4} sx={{ paddingLeft: "7px" }}>
                <Grid
                  container
                  xs={12}
                  sx={{ width: "auto", marginTop: "10px" }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      display: "flex",
                      height: "14px",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                    variant="body1"
                    fontWeight="bold"
                  >
                    <img src={icon7.src} alt="Icon 07" height="14px" />
                    &nbsp; Valid on:
                    <span style={{ marginLeft: "7px" }}>
                      {dayjs(passData.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </Typography>
                  <img
                    style={{
                      width: "180px",
                      marginTop: "15px",
                      height: "180px",
                      padding: "8px",
                      border: "1px solid rgb(192, 189, 189)",
                    }}
                    src={passData.picture}
                  />
                  <img
                    style={{
                      width: "70px",
                      marginTop: "12px",
                      marginLeft: "55px",
                      border: "1px solid rgb(192 189 189)",
                    }}
                    src={passData.qr_code}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CustomModal>
      </>
    </PageContainer>
  );
};

export default Dashboard;

const submit = {
  height: 32,
  color: "white",
  background: "#E15A11",
  fontWeight: 600,
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "#1976d2",
  },
};

const Photo = {
  width: 172,
  height: 48,
  color: "white",
  background: "#5D87FF",
  fontWeight: 600,
  fontSize: "14px",

  "&:hover": {
    backgroundColor: "#1976d2",
  },
  px: 2,
};
