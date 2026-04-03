import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Link
} from '@mui/material';

import PushPinIcon from '@mui/icons-material/PushPin';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

import ApartmentIcon from '@mui/icons-material/Apartment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TableChartIcon from '@mui/icons-material/TableChart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentsIcon from '@mui/icons-material/Payments';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth = 200;
const miniWidth = 70;

export default function Menu() {
  const [open, setOpen] = useState(true);

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
            paddingBottom: "50px"
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
          href="/properties"
        />

        <MenuItem
          open={open}
          icon={<AssessmentIcon />}
          text="収支報告書"
          href="/report/homework"
        />

        <MenuItem
          open={open}
          icon={<TableChartIcon />}
          text="物件別収支一覧"
          href="/report/apartment"
        />

        <MenuItem
          open={open}
          icon={<ReceiptLongIcon />}
          text="物件収支明細"
          href="/properties/123/finance"
        />

        <MenuItem
          open={open}
          icon={<PaymentsIcon />}
          text="支払いデータ"
          href="/report/apartment"
        />

        <MenuItem
          open={open}
          icon={<SettingsIcon />}
          text="マスタ"
          href="/report/apartment"
        />

        <MenuItem
          open={open}
          icon={<LogoutIcon />}
          text="ログアウト"
          href="/report/apartment"
        />
      </List>
      </Box>
      </Box>
    </Drawer>
  );
}

function MenuItem({ open, icon, text, href }) {
  return (
    <ListItemButton
      component={Link}
      href={href}
      sx={{
        minHeight: 40,
        justifyContent: open ? 'initial' : 'center',
        px: 1,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 2 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>

      {open && <ListItemText primary={text} 
        sx={{
            opacity: open ? 1 : 0,
            overflow: "hidden",
            whiteSpace: "nowrap"
          }}/>}
    </ListItemButton>
  );
}
