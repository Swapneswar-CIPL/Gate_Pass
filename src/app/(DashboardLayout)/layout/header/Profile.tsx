"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { useAuth } from "../../../../context/JWTContext/AuthContext.provider";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";





const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const auth: any = useAuth();
  const router = useRouter();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  const handleChangePassword = async () => {
    router.push("./ChangePassword");
  };

  const data = auth?.user?.name;
  const role = auth?.user?.role?.name;

  console.log(auth, "auth in header");
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
            color: "#131121",
         
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>{data}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>{role}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleChangePassword}>
          <ListItemIcon>
            <FiUnlock width={20} />{" "}
          </ListItemIcon>
          <ListItemText> Change Password</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <FiLogOut width={20} />{" "}
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>

       
      </Menu>
    </Box>
  );
};

export default Profile;
