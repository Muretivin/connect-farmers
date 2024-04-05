import React from 'react'
import "../../App";
import Sidebar from '../../Sidebar'
import Feed from './Feed'
import Widgets from '../../Widgets'

function CombineHome() {
  return (
    <div className='app'>
      <div className='app_body'>
          <Sidebar />
          <Feed />
          <Widgets />
      </div>
    </div>
  )
}

export default CombineHome