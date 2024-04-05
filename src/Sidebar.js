import React from 'react'
import './Sidebar.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function Sidebar() {
    const user = useSelector(selectUser);
    const recentItem =(topic) => (
        <div className='sidebar_recentItem'>
            <span className='sidebar_hash'>#</span>
            <p>{topic}</p>

        </div>
    );
  return (
    <div className='sidebar'>
        <div className='sidebar_top'>
            <img src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlWR8MXx8fGVufDB8fHw%3D&w=1000&q=80' alt=''/>
            <Avatar className='sidebar_avatar'>{user.email[0]} </Avatar>
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4> 
        </div>
        <div className='sidebar_stats'>
          <div className='sidebar_stat'>
              <p>who viewed you</p>
              <p className='sidebar_statNumber'>2,543</p>

          </div>
          <div className='sidebar_stat'>
              <p>Views on post</p>
              <p className='sidebar_statNumber'>2,543</p>

          </div>
          <div className='sidebar_bottom'>
              <p> Recent</p>
              {recentItem('poultry')}
              {recentItem('dairy farming')}
              {recentItem('fish farming')}
              {recentItem('agroforestry')}
              {recentItem('mixed farming')}

          </div>
        
        </div>

    </div>
  )
}

export default Sidebar