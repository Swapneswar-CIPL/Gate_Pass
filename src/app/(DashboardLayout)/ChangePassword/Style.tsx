"use client"

import styled from "@emotion/styled";
import {Button, Typography } from "@mui/material";
export const  Heading1 = styled(Typography)(({ theme }) => ({
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "28px",
    alignItem: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "black",
    // paddingTop: "10px",
    textTransform : "capitalize",
   
       
  }));
  const LoginButton = styled(Button)`
width:auto;
  height:50px;
  background: #e15a11;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
  color: white;
  &:hover {
    background-color: #e15a11;
  }
`;
  export const Heading2 = styled(Typography)(({ theme }) => ({
    // fontFamily: "Nunito",
    fontSize: "15px",
     lineHeight:"20px",
    letterSpacing: "0.07px",
    textAlign: "left",
    color: "black",
    fontWeight:"600",
   
  }));

