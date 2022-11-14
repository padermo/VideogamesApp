import React from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='container-navbar'>
      <div className='container-interno-navbar'>
        <div className="links-menu">
          <Link to={'/'} className='links'><label htmlFor="">Games</label></Link>
          <Link to={'/create-videogames'} className='links'><label htmlFor="">Create</label></Link>
        </div>
        <div className="searchbar">
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default NavBar