import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getVideogame } from '../../redux/actions';
import Videogame from './Videogame';

function Videogames() {
  let dispatch = useDispatch();
  let state = useSelector(state => state.videogames);

  useEffect(() => {
    dispatch(getVideogame());
  }, [dispatch])
  
  console.log(state)

  return (
    <div className='container-videogames'>
      <div className="container-interno-videogames">
        {
          state.length ?
            state.map(e => (
              <Videogame name={e.name} genre={e.genre} image={e.image} />
            ))
            :
            ""
        }
      </div>
    </div>
  )
}

export default Videogames