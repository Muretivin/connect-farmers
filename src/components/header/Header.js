import React from 'react'
import  './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from '../../HeaderOption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShopIcon from '@mui/icons-material/Shop';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
import { auth } from '../../firebase';
import { Link} from 'react-router-dom';


function Header() {

  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout())
    auth.signOut();

  }
  return (
    <div className='header'>
        <div className='header_left'>
          
            <img src='https://play-lh.googleusercontent.com/2BVmc0f-rf0CqAzvJlkbNH9spabOfI4BarGh6LWeAufw-cFLzo3TsFhPQ_xBAML-Y6ax' alt=''/>
            <div className='header_search'>
                <SearchIcon />
                <input placeholder='search' type='text'/>
            </div>
        </div>
        <div className='header_right'>
            <Link to='/' className='link'><HeaderOption Icon={HomeIcon} title='Home'/></Link>
            <HeaderOption Icon={SupervisorAccountIcon} title='My Network'/>
            <HeaderOption Icon={BusinessCenterIcon} title='jobs'/>
            <Link to="/farmer" className='link'><HeaderOption Icon={ShopIcon} title='Shop'/></Link>
            <HeaderOption Icon={NotificationsIcon} title='Notifications'/>
            <HeaderOption Icon={ChatIcon} title='Messages'/>
            <Link to="/records" className='link'><HeaderOption Icon={DriveFileRenameOutlineIcon} title='My Data'/></Link>
            <HeaderOption avatar={true} title='me' onClick={logoutOfApp}/>
            
          </div>
    </div>
  )
}

export default Header