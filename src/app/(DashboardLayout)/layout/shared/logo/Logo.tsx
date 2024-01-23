"use client"
import Link from "next/link";
import { Box, styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
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
  );
};

export default Logo;
