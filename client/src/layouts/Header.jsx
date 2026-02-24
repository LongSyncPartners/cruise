import logo from '../assets/images/header_logo.png';
import {AppBar, Toolbar} from '@mui/material';

export default function Header() {
  return (
    <div className="header-container">
          <AppBar position="fixed">
            <Toolbar className='header-toolbar'>
              <div className="header-box logo"><img src={logo} alt="" className="header-logo-img" /></div>
              <div className="header-box system-name">物件管理帳票システム</div>
              <div className="header-box user-info">所属　名前　ログイン日時</div>
            </Toolbar>
          </AppBar>
        
    </div>
  );
}
