"use client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  styled,
  Typography,
  TextField,
  Button,
  Grid,
  Tooltip,
  OutlinedInput,
  Card,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/JWTContext/AuthContext.provider";

import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// eslint-disable-next-line react/display-name
const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
});
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const SendOTP = styled(Button)`
transform : none;
font-family: "Nunito", sans-serif;
background: #3E7D60;
color: #fff;
font-size:18px;
font-weight:600;
border-radius: 2px;
height: 54px;
width:130px;
&:hover{
  background-color:#E15A11
}
`;

const LoginButton = styled(Button)`
  width: 600px;
  height: 30px;
  background: #e15a11;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  /* Grid-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25); */
  color: white;
 
  &:hover {
    background-color: #e15a11;
  }
`;





import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Heading1 } from "./Style";
import React from "react";
const ChangePassword = () => {
  const router = useRouter();
  const auth = useAuth();
  const [t, setToken] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const accessToken = window.localStorage.getItem("accessToken");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const splitUrl = url.split("t=");
    
    // const submitResetPassword = async () => {
     
    //   try {
    //     // const accessToken = window.localStorage.getItem("accessToken");
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}"/api/user/resetPassword"`,
    //       {
    //         headers: {
    //           authorization: `Bearer ${accessToken}`,
    //         },
    //       }
    //     );
    //     console.log(response, "mymresponseresponseresponseresponseresponseresponseresponseresponseresponseymy")
    //     // setSelectedPsc(response?.data?.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    //   submitResetPassword()
    // }
    if (splitUrl.length === 2) {
      const extractedToken = splitUrl[1];
      // console.log(extractedToken, "token");
      setToken(extractedToken); // Store the extracted token in the state
    }
 }, [pathname, searchParams]);



 const handleoldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setOldPassword(event.target.value);
  // Check if passwords match when the new password is changed
  // setPasswordsMatch(event.target.value === confirmPassword);
};
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    // Check if passwords match when the new password is changed
    setPasswordsMatch(event.target.value === confirmPassword);
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    // Check if passwords match when the confirm password is changed
    setPasswordsMatch(event.target.value === newPassword);
  };


  const options = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  };
  const handleSubmit = async () => {
    console.log("Password--------",oldPassword, newPassword, confirmPassword)
    if (newPassword == confirmPassword) {
      try {
        let res: any = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/reset-password`,

          {
            oldPassword:oldPassword,
            password: newPassword
          }, { headers: {
            Authorization: `bearer ${accessToken}`,
          },}
        )
        toast.success('Password has been change successfully!', {

          position:'top-right',
          autoClose: 3000, // Time in milliseconds before the toast auto closes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push("/")
        }, 3000)
      } catch (error: any) {
        console.log("error--------", error)
        toast.error('Error in changing the password. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
     
      }
    }else{
      toast.error('Error in resetting the password. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
};
const backToLoginPage=()=>{
  return router.push("/");
}

  return (
    <Grid
    sx={{
      width: "600px",
      height: "450px",
      background: "#FDFDFD",
      border: "1px solid #E1E1E1",
      margin: "auto",
      borderRadius : '10px',
      marginTop:"20px",
     
    }}
  >    <Grid
      container
     
    >
       <Grid item
       xs={12}
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop:"20px",
            marginTop:"20px"
         
          }}
        ><LockIcon/>
        </Grid>
     
      <Grid item
       xs={12}
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position:'relative',
          }}
          onClick={backToLoginPage}
        >
          <Tooltip title="Back to Dashboard"          
>
          <Grid
        item
        xs={6}
          sx={{position:'absolute', top:20, left:20, borderRadius:'20px', padding:'5px', ":hover":{
            backgroundColor:'#E1D9D1', cursor:'pointer'
          }}} >
          <ArrowBackIosNewIcon />
          </Grid>
          </Tooltip>
       
          </Grid>
      <Grid
      item
      xs={12}
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop:"20px",
            paddingBottom:"20px",
          
          }}
        >
          <Typography variant="h5">Change Password </Typography>
          <ToastContainer />
           
          </Grid>
   
         
         
      <Grid
        container
        xs={12}
        spacing={3}
        sx={{ marginLeft: "0px" ,padding:"10px"}}
        component={"form"}
        autoComplete="on"
      >
        <Grid item xs={12} sx={{ lineHeight: "35px", marginTop: "10px" }}>
        <Typography sx={{ paddingLeft: "5px" }}>Old Password</Typography>
          <OutlinedInput
            placeholder="Password"
            type="password"
            sx={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid var(--neutral-gray-gray-100, #E0E2E7)",
              background: "var(--neutral-gray-gray-25, #F9F9FC)",
              height: "30px",
            }}
            value={oldPassword}
            onChange={handleoldPasswordChange}
          />
        </Grid>
        <Grid item xs={12}>
        <Typography sx={{ paddingLeft: "5px" }}>New Password</Typography>
          <OutlinedInput
            placeholder="Set New Password"
            type="password"
            sx={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid var(--neutral-gray-gray-100, #E0E2E7)",
              background: "var(--neutral-gray-gray-25, #F9F9FC)",
              height: "30px",
            }}
            value={newPassword}
            onChange={handlePasswordChange}
          />
        </Grid>
        <Grid item xs={12}>
        <Typography sx={{ paddingLeft: "5px" }}>Confirm New password</Typography>
          <OutlinedInput
            id="outlined-basic"
            placeholder="Confirm New Password"
            type="password"
            sx={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid var(--neutral-gray-gray-100, #E0E2E7)",
              background: "var(--neutral-gray-gray-25, #F9F9FC)",
              height: "30px",
            }}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
           
          }}
        >
          <LoginButton sx={{ marginBottom:"20px"}}onClick={handleSubmit} disabled={!passwordsMatch}>
            Submit
          </LoginButton>
          <ToastContainer />

        
        </Grid>
      </Grid>
    </Grid>
    </Grid>
  );
};
export default ChangePassword;









