import React from 'react'
import NavBar from '../NavBar/NavBar'

function Header() {
  return (
    <div className='container-header'>
      <div className="container-interno-header">
        <div className="header-img">
          
        </div>
        <div className="container-header-navbar">
          <NavBar/>
        </div>
      </div>
    </div>
  )
}

export default Header