"use client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/JWTContext/AuthContext.provider";

import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";

const GreenBox = styled(Box)`
  width: 874px;
  height: 64px;
  background: #3e7d60;
  border: 0.5px solid #3e7d60;
  display: flex;
`;

const Heading = styled(Typography)`
  width: 221px;
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: #eaf2f9;
  margin-top: 22px;
  margin-left: auto;
  margin-right: auto;
`;

const SBox = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 40px;
  }
  margin-left: 47px;
`;

const NewRegistration = styled(Button)`
  width: 254px;
  height: 62px;
  background: #e15a11 !important;
  box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25) !important;
  color: white;
  margin-right: 280px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 18px;
  &:hover {
    background-color: #e15a11 !important;
  }
`;

const LoginButton = styled(Button)`
  width: 131px;
  height: 62px;
  background: #e15a11 !important;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-size: 20px;
  box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25) !important;
  color: white !important;
  &:hover {
    background-color: #e15a11 !important;
  }
`;

const ResendOTP = styled(Typography)`
  width: 150px;
  height: 22px;
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-decoration-line: underline;
  color: #1e88e5;
  cursor: pointer;
  margin-left: auto;
`;

const ErrorTypography = styled(Typography)`
  color: #ff0000;
  font-size: 12px;
  margin-top: 10px !important;
`;

// const passwordValidationRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
const emailValidationRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const mobileValidationRegex =
  /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;
// const otrValidationRegex = '';

function Login() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword]: any = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [error, setError] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [emailPasswordopen, setEmailPasswordopen] = React.useState(false);
  const [successLogin, setSuccessLogin] = React.useState(false);
  const [captchaUrl, setCaptchaUrl] = useState<string>("");
  const [tryagain, setTryagain] = useState<any>(false);
  const [tryagaincaptcha, setTryagaincaptcha] = useState<any>(false);

  const [capchaCode, SetCapchaCode] = useState<any>("");
  const [inputCapcha, setInputCapcha] = useState<any>("");

  useEffect(() => {
    const randomCapcha: string = Math.random().toString(36).substring(2, 8);
    SetCapchaCode(randomCapcha);
  }, []);
  const refreshCapcha = () => {
    SetCapchaCode(Math.random().toString(36).substring(2, 8));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };


  const handleLogin = async () => {
    // Check if the CAPTCHA is incorrect
    if (inputCapcha !== capchaCode) {
      refreshCapcha();
      setTryagain(false); // Reset tryagain to false, as this error is related to CAPTCHA
      setTryagaincaptcha(true);
      setOpen(true);
      setSuccessLogin(false);
      toast.error('Invalid CAPTCHA!', {
        position:'top-right',
         autoClose: 3000, 
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
       });
      return;
    }

    // CAPTCHA is correct, proceed with authentication
    const authData = await auth.signIn(email, password);

    if (authData) {
      setError('Invalid Credentials, Please try again');
      setTryagain(true);
      setOpen(true);
      setSuccessLogin(false);
         
      toast.error('Invalid Credentials!', {
        position:'top-right',
         autoClose: 3000, // Time in milliseconds before the toast auto closes
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
       });
    } else {
      // Authentication is successful
      setTryagain(false);
      setTryagaincaptcha(false);
      setSuccessLogin(true);
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const Heading1 = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1),
    color: "black",
    fontFamily: "Nunito, sans-serif",
    // fontSize: "22.26px",
    lineHeight: "41.72px",
    fontWeight: 700,
  }));

  const LoginButton = styled(Button)`
    width: auto;
    height: auto;

    background: #e15a11;
    font-weight: 600;
    font-family: "Nunito", sans-serif;
    font-size: 20px;
    box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
    color: white;
    &:hover {
      background-color: #e15a11;
    }
  `;
  const SBox = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;

    & > div,
    & > button,
    & > p {
      margin-top: 10px;
    }
    padding: 20px;
  `;

  const ResendOTP = styled(Typography)`
    width: 150px;
    height: 22px;
    font-family: "Nunito", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 22px;
    text-decoration-line: underline;
    color: #1e88e5;
    cursor: pointer;
    margin: auto;
    text-align: center;
    justify-content: center;
  `;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",

          width: "auto",
          height: "100vh",
          top: "4px",
          backgroundImage: `url(/Banner.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            background: "#000000b3",
            width: "auto",
            height: "100vh",
            top: "0",
            left: "0",
            borderRadius: "0",
            color: "#ffffff",
            padding: "40px",
            zIndex: "777",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/Gov_Logo_912e861f02.png"
              width={50}
              height={70}
              alt={""}
            />
          </Box>

          <Box
            sx={{
              // flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Heading1
              sx={{
                color: "#fff900",
                lineHeight: "28px",
                fontSize: {
                  xs: "11.26",
                  sm: "11.26",
                  md: "15.26px",
                  lg: "17.26px",
                  xl: "17.26px",
                },
              }}
            >
              UNION PUBLIC SERVICE COMMISSION
            </Heading1>
          </Box>
          <Typography
            sx={{
              letterSpacing: "0em",
              textAlign: "center",
              lineHeight: "30px",

              justifyContent: "center",
            }}
          >
            (ONLINE GATE PASS PORTAL)
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Nunito",
                fontSize: "20px",
                fontWeight: "600",
                lineHeight: "19px",
                letterSpacing: "0em",
                textAlign: "center",
                justifyContent: "center",
                marginTop: "7px",
                mb: 2,
                color: "#fff900",
              }}
            >
              User Login
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                lineHeight: "24px",
                mt: 1,
                fontSize: {
                  xs: "11.26",
                  md: "12.26px",
              
                },
              }}
            >
              Employee Id
            </Typography>
            <TextField
              // id="outlined-basic"
              placeholder="Email/OTR/Phone"
              size="small"
              value={email}
              sx={{ borderRadius: "4px", width: "100%" }}
              inputProps={{
                sx: {
                  height: "9px",
                  background: "white",
                  borderRadius: "4px",
                  fontSize: "12px !important",
                },
              }}
              onInput={(event: any) => setEmail(event.target.value)}
            />

            <Typography
              variant="body1"
              sx={{
                lineHeight: "24px",
                mt: 1,
                fontSize: {
                  xs: "11.26",
                  md: "12.26px",
                },
              }}
            >
              Password
            </Typography>

            <OutlinedInput
              // id="outlined-adornment-weight"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              size="small"
              value={password}
              sx={{
                width: "100%",
                background: "white",
                marginBottom: "8px",
                fontSize: "12px !important",
                height: "27px",
              }}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <Typography
              variant="body1"
              sx={{
                lineHeight: "24px",

                fontSize: {
                  xs: "11.26",
                  md: "12.26px",
                },
              }}
            >
              Validate Captcha
            </Typography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 0,
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Enter Captcha"
                sx={{ borderRadius: "4px", width: "80%" }}
                size="small"
                inputProps={{
                  maxLength: 6,
                  sx: {
                    height: "9px",
                    background: "white",
                    borderRadius: "4px",
                    fontSize: "12px !important",
                  },
                }}
                onKeyDown={handleKeyPress}
                onChange={(e: any) => setInputCapcha(e.target.value)}
              />
              <Typography
                sx={{
                  color: "rgb(7,8,11)",
                  userSelect: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  p: "2px",
                  width: "60%",
                  backgroundColor: "rgb(255,255,255)",
                  textAlign: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                  ml: "5px",
                }}
              >
                {capchaCode}
              </Typography>
              <Button
                onClick={refreshCapcha}
                startIcon={<RefreshIcon sx={{ color: "#fff900" }} />}
              ></Button>
            </Box>

            <LoginButton
              onClick={handleLogin}
              size="small"
              sx={{ fontSize: "15px", py: 1, width: "100%", mt: 2 }}
            >
              Login
            </LoginButton>
            <ToastContainer />




            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "auto",
                color: "#ffffff",
              }}
            >
              <ResendOTP
                sx={{
                  color: "#ffffff",
                  fontSize: "12px",
                  textDecoration: "none",
                  mt: 2,
                }}
                variant="body1"
                onClick={() => {
                  router.push("./forgot");
                }}
              >
                Forgot Password ?
              </ResendOTP>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
 
  );
}

export default Login;

