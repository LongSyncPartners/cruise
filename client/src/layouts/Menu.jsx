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
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

const drawerWidth = 240;
const miniWidth = 50;

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      variant="permanent"
      className='menu-container'
      sx={{
        width: open ? drawerWidth : miniWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : miniWidth,
          transition: 'width 0.1s',
          overflowX: 'hidden',
          boxSizing: 'border-box'
        },
      }}
    >
      {/* Header menu */}
      <Box
        className="menu-header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          px: 1,
          height: 48,
        }}
      >
        {open && <Typography fontSize={14}>メニュー</Typography>}
        <IconButton className='menuToggleBtn' size="small" onClick={() => setOpen(!open)}>
          <PushPinIcon fontSize="small" />
        </IconButton>
      </Box>

      <List>
        <MenuItem
          open={open}
          icon={<HomeIcon />}
          text="一般帳票"
          href="/report/home"
        />

        <MenuItem
          open={open}
          icon={<HomeWorkIcon />}
          text="サブリース帳票"
          href="/report/homework"
        />

        <MenuItem
          open={open}
          icon={<ApartmentIcon />}
          text="アパート帳票"
          href="/report/apartment"
        />
      </List>
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
        px: 2,
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

      {open && <ListItemText primary={text} />}
    </ListItemButton>
  );
}
