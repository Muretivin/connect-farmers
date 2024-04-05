import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HeaderOption from '../../HeaderOption';

function Navbar() {
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
            <Link to='/about' className='link'> <HeaderOption Icon={GroupsIcon} title='About'/></Link>
              <Link to='/contact' className='link'> <HeaderOption Icon={ConnectWithoutContactIcon} title='Contact'/></Link>
              <Link to='/Login' className='link'>  <HeaderOption Icon={LoginIcon} title='Login'/></Link>
              <Link to='/register' className='link'> <HeaderOption Icon={AppRegistrationIcon} title='Register'/></Link>

            
          </div>
    </div>
  )
}

export default Navbar