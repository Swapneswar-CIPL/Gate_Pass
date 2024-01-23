
"use client"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import { useAuth } from "@/context/JWTContext/AuthContext.provider";


const ErrorTypography = styled(Typography)`
  color: #ff0000;
  font-size: 12px;
  margin-top: 10px !important;
`;
const SBox = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
  margin-left: 47px;
`;
const ForgotButton = styled(Button)`
  width: 500px;
  height:50px;
  background: #e15a11;
  font-weight: 600;
  text-transform: none;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
  color: white;
  &:hover {
    background-color: #e15a11;
  }
`;


const Forgot = (props: any) => {
  const styles = {
    paperContainer: {
      backgroundImage: `url(/Banner.png)`,
    },
  };
  const auth = useAuth();
  const { respdata } = props;
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleForgot = async () => {
    const authData = await auth.forgotPassword(email, "email", );
    console.log("forgot-password---------", authData, "value")
    if (authData) {
      setError(authData);
      console.log("error in sending email ---------")
      toast.error("Error in sending the email. Please try again.", {

        position:'top-right',
        autoClose: 3000, // Time in milliseconds before the toast auto closes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    }else{
      console.log("email sent---------")
      toast.success("Email has been sent successfully!", {

        position:'top-right',
        autoClose: 3000, // Time in milliseconds before the toast auto closes
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
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "600px",
          background: "#FDFDFD",
          border: "1px solid #E1E1E1",
          margin: "auto",
          borderRadius : '10px'
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position:'relative',
            marginTop: "3%",
          }}
          onClick={backToLoginPage}
        >
          <Tooltip title="Back to Login"          
>
          <Box
        //   onClick={()=>router.push("/")}
         
          sx={{position:'absolute', top:20, left:20, borderRadius:'20px', padding:'5px', ":hover":{
            backgroundColor:'#E1D9D1', cursor:'pointer'
          }}} >
          <ArrowBackIosNewIcon />
          </Box>
          </Tooltip>
          <LockIcon sx={{fontSize:'60px',}} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{color:'#E15A11', fontWeight:600}} variant="h6">RESET PASSWORD</Typography>
        </Box>
        <SBox>
          <Typography
            variant="body1"
            fontFamily='Nunito'
          >
            Employee &apos; s Email
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Email"
            variant="outlined"
            sx={{ width: "500px", height: "55px", background: "white" }}
            onChange={(e:any) => {
              setEmail(e.target.value), setError(false);
}}
              inputProps={{
                style: {
                  height :'45px',
                  padding: '0 14px',
                },
            }}
          />
          <Typography sx={{color:'#E15A11', fontWeight:300, fontSize:'10px'}} variant="h6">Verification code will be send to this mail id.</Typography>
          <ErrorTypography>
            {error}
          </ErrorTypography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "500px",
            }}
          >
           
          </Box>
          <Box
            sx={{
              marginTop: "30px",
              mb:5,
              width: "500px",
              display:'flex',
              gap:'20px',
              justifyContent: "space-between",
            }}
          >
            <ForgotButton  
            onClick={handleForgot}
            >Verify Email Id</ForgotButton>
                          <ToastContainer />

          </Box>
        </SBox>
      </Box>
    </Box>
  );
};
export default Forgot;




















// "use client";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Button,
//   TextField,
//   Tooltip,
//   Typography,
//   styled,
// } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import LockIcon from "@mui/icons-material/Lock";
// import { useState } from "react";
// import { useAuth } from "@/context/JWTContext/AuthContext.provider";
// const ErrorTypography = styled(Typography)`
//   color: #ff0000;
//   font-size: 12px;
//   margin-top: 10px !important;
// `;

// const SBox = styled(Box)`
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   & > div,
//   & > button,
//   & > p {
//     margin-top: 20px;
//   }
//   margin-left: 47px;
// `;

// const ForgotButton = styled(Button)`
//   width: 500px;
//   height: 50px;
//   background: #e15a11;
//   font-weight: 600;
//   text-transform: none;
//   font-family: "Nunito", sans-serif;
//   font-size: 15px;
//   box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
//   color: white;
//   &:hover {
//     background-color: #e15a11;
//   }
// `;

// const Forgot = (props: any) => {
//   const styles = {
//     paperContainer: {
//       backgroundImage: `url(/Banner.png)`,
//     },
//   };
//   const auth = useAuth();
//   const { respdata } = props;
//   const router = useRouter();
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmp, setConfirmp] = useState<string>("");


//   const [error, setError] = useState<boolean>(false);
//   const handleForgot = async () => {
//     console.log("email------", email)
//     const authData = await auth.forgotPassword(email, "email", password, "password");
//     if (authData) {
//       console.log("authData------", authData)

//       setError(authData);
//     }
//     console.log("authDataaaaaaaaaaaaa-------", authData)
//   };
//   const backToLoginPage = () => {
//     return router.push("/");
//   };
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh",

//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: "600px",
//           background: "#FDFDFD",
//           border: "1px solid #E1E1E1",
//           margin: "auto",
//           borderRadius: "10px",
//         }}
//       >
//         <Box
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             position: "relative",
//             marginTop: "3%",
//           }}
//           onClick={backToLoginPage}
//         >
//           <Tooltip title="Back to Login">
//             <Box
//               //   onClick={()=>router.push("/")}

//               sx={{
//                 position: "absolute",
//                 top: 20,
//                 left: 20,
//                 borderRadius: "20px",
//                 padding: "5px",
//                 ":hover": {
//                   backgroundColor: "#E1D9D1",
//                   cursor: "pointer",
//                 },
//               }}
//             >
//               <ArrowBackIosNewIcon />
//             </Box>
//           </Tooltip>
//           <LockIcon sx={{ fontSize: "60px" }} />
//         </Box>
//         <Box
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Typography sx={{ color: "#E15A11", fontWeight: 600 }} variant="h6">
//             CHANGE PASSWORD
//           </Typography>
//         </Box>
//         <SBox>
//           <Typography variant="body1" fontFamily="Nunito">
//             Employee's Email
//           </Typography>
//           <TextField
//             id="outlined-basic"
//             placeholder="Email"
//             variant="outlined"
//             name="email"
//             value={email}
//             sx={{ width: "500px", height: "55px", background: "white" }}
//             onChange={(e: any) => {
//               setEmail(e.target.value), setError(false);
//             }}
//             inputProps={{
//               style: {
//                 height: "45px",
//                 padding: "0 14px",
//               },
//             }}
//           />



// <Typography variant="body1" fontFamily="Nunito">
//             Password
//           </Typography>
//           <TextField
//             id="outlined-basic"
//             placeholder="Password"
//             variant="outlined"
//             name="password"
//             value={password}
//             sx={{ width: "500px", height: "55px", background: "white" }}
//             onChange={(e: any) => {
//               setPassword(e.target.value), setError(false);
//             }}
//             inputProps={{
//               style: {
//                 height: "45px",
//                 padding: "0 14px",
//               },
//             }}
//           />




// <Typography variant="body1" fontFamily="Nunito">
//             Confirm Password
//           </Typography>
//           <TextField
//             id="outlined-basic"
//             placeholder="Confirm Password"
//             variant="outlined"
//             sx={{ width: "500px", height: "55px", background: "white" }}
//             onChange={(e: any) => {
//               setConfirmp(e.target.value), setError(false);
//             }}
//             inputProps={{
//               style: {
//                 height: "45px",
//                 padding: "0 14px",
//               },
//             }}
//           />









//           {/* <Typography
//             sx={{ color: "#E15A11", fontWeight: 300, fontSize: "10px" }}
//             variant="h6"
//           >
//             Verification code will be send to this mail id.
//           </Typography>
//           <ErrorTypography>{error}</ErrorTypography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "500px",
//             }} */}
//           {/* ></Box> */}
//           <Box
//             sx={{
//               marginTop: "30px",
//               mb: 5,
//               width: "500px",
//               display: "flex",
//               gap: "20px",
//               justifyContent: "space-between",
//             }}
//           >
//             <ForgotButton onClick={handleForgot}>Submit</ForgotButton>
//           </Box>
//         </SBox>
//       </Box>
//     </Box>
//   );
// };

// export default Forgot;
