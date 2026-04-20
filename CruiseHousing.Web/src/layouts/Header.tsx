import logo from '../assets/images/header_logo.png';
import {AppBar, Toolbar} from '@mui/material';

export default function Header() {
  return (
    <div className="header-container">
          <AppBar position="fixed">
            <Toolbar className='header-toolbar'>
              <div className="header-box system-name">株式会社クルーズホールディングス　物件管理システム</div>
              <div className="header-box user-info">ユーザー <span/> XXXXXXXXXX</div>
            </Toolbar>
          </AppBar>
        
    </div>
  );
}
