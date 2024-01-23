"use client";

import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    // color: theme.palette.text.secondary,
    backgroundColor: "#eee",
  }));

  return (
    <AppBarStyled position="fixed" color="default">
      <ToolbarStyled>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
           <Box sx={{ paddingRight: "10px" }}>
                    <img src="/Gov_Logo_912e861f02.png" width={34} alt={"logo_img"} />
                  </Box>
          <Box>
            <Typography
              sx={{
                color: "#000",
                fontWeight: "700",
                fontSize: "18px",
                cursor: "pointer",
                letterSpacing: "-0.8px",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              संघ लोक सेवा आयोग
            </Typography>

            <Typography
              sx={{
                color: "#000",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
                letterSpacing: "-0.8px",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Union Public Service Commission
            </Typography>
          </Box>
        </Box>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        ></IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
