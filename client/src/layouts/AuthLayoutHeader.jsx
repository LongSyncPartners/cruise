import logo from '../assets/images/header_logo.png';
import {AppBar, Toolbar} from '@mui/material';

export default function AuthLayoutHeader() {
  return (
    <div className="header-container">
          <AppBar position="fixed">
            <Toolbar className='header-toolbar'>
              <div className="header-box system-name">株式会社クルーズホールディングス　物件管理システム</div>
            </Toolbar>
          </AppBar>
        
    </div>
  );
}
