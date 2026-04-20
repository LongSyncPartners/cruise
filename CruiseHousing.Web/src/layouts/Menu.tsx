import { useMemo, useState } from "react";
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
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

import ApartmentIcon from "@mui/icons-material/Apartment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TableChartIcon from "@mui/icons-material/TableChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const DRAWER_WIDTH = 200;
const MINI_WIDTH = 70;

type AppMenuItem = {
  text: string;
  to: string;
  icon: ReactNode;
};

type MenuItemProps = {
  open: boolean;
  icon: ReactNode;
  text: string;
  to: string;
  selected: boolean;
};

export default function Menu() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const menuItems = useMemo<AppMenuItem[]>(
    () => [
      {
        text: "物件一覧",
        to: "/properties",
        icon: <ApartmentIcon />,
      },
      {
        text: "収支報告書",
        to: "/report/homework",
        icon: <AssessmentIcon />,
      },
      {
        text: "物件別収支一覧",
        to: "/report/apartment",
        icon: <TableChartIcon />,
      },
      {
        text: "物件収支明細",
        to: "/properties/finance",
        icon: <ReceiptLongIcon />,
      },
      {
        text: "支払いデータ",
        to: "/payment",
        icon: <PaymentsIcon />,
      },
      {
        text: "マスタ",
        to: "/master",
        icon: <SettingsIcon />,
      },
      {
        text: "ログアウト",
        to: "/logout",
        icon: <LogoutIcon />,
      },
    ],
    []
  );

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Drawer
      variant="permanent"
      className="menu-container"
      sx={{
        width: open ? DRAWER_WIDTH : MINI_WIDTH,
        flexShrink: 0,
      }}
      slotProps={{
        paper: {
          sx: {
            width: open ? DRAWER_WIDTH : MINI_WIDTH,
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
          sx={toggleButtonSx}
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
            {menuItems.map((item) => (
              <MenuItem
                key={item.to}
                open={open}
                icon={item.icon}
                text={item.text}
                to={item.to}
                selected={location.pathname === item.to}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}

function MenuItem({ open, icon, text, to, selected }: MenuItemProps) {
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

const toggleButtonSx: SxProps<Theme> = {
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
};