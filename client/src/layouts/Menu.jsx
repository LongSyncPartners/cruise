import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TableChartIcon from "@mui/icons-material/TableChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth = 200;
const miniWidth = 70;

export default function Menu() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Drawer
      variant="permanent"
      className="menu-container"
      sx={{
        width: open ? drawerWidth : miniWidth,
        flexShrink: 0,
      }}
      slotProps={{
        paper: {
          sx: {
            width: open ? drawerWidth : miniWidth,
            transition: "width 0.1s",
            overflowX: "hidden",
            boxSizing: "border-box",
            overflow: "visible",
            top: "60px",
            left: "15px",
            border: "2px solid #ccc",
            borderRadius: "10px",
            height: "fit-content",
            paddingBottom: "50px",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", height: "100%" }}>
        <IconButton
          onClick={toggleMenu}
          disableRipple
          sx={{
            position: "absolute",
            top: 12,
            right: -20,
            width: 42,
            height: 42,
            border: "2px solid #ccc",
            backgroundColor: "#f7f7f7",
            zIndex: 9999,
            outline: "none",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        <Box
          sx={{
            overflow: "hidden",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <List>
            <MenuItem
              open={open}
              icon={<ApartmentIcon />}
              text="物件一覧"
              to="/properties"
              selected={location.pathname === "/properties"}
            />

            <MenuItem
              open={open}
              icon={<AssessmentIcon />}
              text="収支報告書"
              to="/report/homework"
              selected={location.pathname === "/report/homework"}
            />

            <MenuItem
              open={open}
              icon={<TableChartIcon />}
              text="物件別収支一覧"
              to="/report/apartment"
              selected={location.pathname === "/report/apartment"}
            />

            <MenuItem
              open={open}
              icon={<ReceiptLongIcon />}
              text="物件収支明細"
              to="/properties/finance"
              selected={location.pathname === "/properties/finance"}
            />

            <MenuItem
              open={open}
              icon={<PaymentsIcon />}
              text="支払いデータ"
              to="/payment"
              selected={location.pathname === "/payment"}
            />

            <MenuItem
              open={open}
              icon={<SettingsIcon />}
              text="マスタ"
              to="/master"
              selected={location.pathname === "/master"}
            />

            <MenuItem
              open={open}
              icon={<LogoutIcon />}
              text="ログアウト"
              to="/logout"
              selected={location.pathname === "/logout"}
            />
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}

function MenuItem({ open, icon, text, to, selected }) {
  return (
    <ListItemButton
      component={RouterLink}
      to={to}
      selected={selected}
      sx={{
        minHeight: 40,
        justifyContent: open ? "initial" : "center",
        px: 1,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 2 : "auto",
          justifyContent: "center",
        }}
      >
        {icon}
      </ListItemIcon>

      {open && (
        <ListItemText
          primary={text}
          sx={{
            opacity: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        />
      )}
    </ListItemButton>
  );
}