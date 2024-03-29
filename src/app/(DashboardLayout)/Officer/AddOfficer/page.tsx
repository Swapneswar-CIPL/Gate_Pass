"use client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/shared/DashboardCard";


import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { createOfficer } from "@/utils/api";
import { useAuth } from "@/context/JWTContext/AuthContext.provider";
import { useRouter } from "next/navigation";

const defaultValue = {
  officer_name: "",
  building_room_num: "",
  status: "",
  designation: "",
};
const requiredField = {
  color: "red",
  marginRight: "4px",
};
const Page = () => {
  const auth = useAuth()
  const router = useRouter();
  let [officerdata, setOfficerdata] = useState(defaultValue);



  const handleChange = (e: any) => {
    setOfficerdata({ ...officerdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      officerdata.officer_name === "" ||
      officerdata.building_room_num === "" ||
      officerdata.designation === ""
    ) {
      
     

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
      console.log('after', toast.success);


    } else {
      const res = await createOfficer(officerdata);
      if (res?.officer) {
        // alert(res.message);
        toast.success(res.message, {

          position:'top-right',
          autoClose: 3000, // Time in milliseconds before the toast auto closes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOfficerdata(defaultValue);
      }
    }
  };

  useEffect(() => {
    if (!auth.user) {
      router.push("/");
    }
  }, [auth, router]);


  const handleCancelSubmit=async () => {
    setOfficerdata(defaultValue);

   
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

  return (
    <DashboardCard title="Add Officer">
      <>
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
              md: "flex",
            },
          }}
        >
          <Stack
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
              },
              mr: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Name<span style={requiredField}>*</span>
            </Typography>
            <CustomTextField
              name="officer_name"
              onChange={(event: any) => {
                handleChange(event);
              }}
              value={officerdata.officer_name}
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={700}
              component="label"
              htmlFor="location"
              mb="5px"
              mt="10px"
            >
              Location<span style={requiredField}>*</span>
            </Typography>
            <CustomTextField
              id="location"
              onChange={(event: any) => {
                handleChange(event);
              }}
              sx={{ mb: 5 }}
              variant="outlined"
              fullWidth
              name="building_room_num"
              value={officerdata.building_room_num}
            />
          </Stack>
          <Stack
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="status"
              mb="5px"
            >
              Status<span style={requiredField}>*</span>
            </Typography>
            {/* <CustomTextField id="status" variant="outlined" fullWidth /> */}
            <Select
              //   displayEmpty
              style={{ height: "30px" }}
              name="status"
              value={officerdata.status}
              onChange={(event: any) => {
                handleChange(event);
              }}
              //   input={<OutlinedInput />}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Placeholder</em>
              </MenuItem>

              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">In-Active</MenuItem>
            </Select>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="designation"
              mb="5px"
              mt="10px"
            >
              Designation<span style={requiredField}>*</span>
            </Typography>
            <CustomTextField
              sx={{ mb: 5 }}
              id="designation"
              variant="outlined"
              name="designation"
              value={officerdata.designation}
              onChange={(event: any) => {
                handleChange(event);
              }}
              fullWidth
            />
          </Stack>
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
                Add
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



      </>
    </DashboardCard>
  );
};

export default Page;
