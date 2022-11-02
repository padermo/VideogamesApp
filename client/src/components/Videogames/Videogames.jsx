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
    <div>

    </div>
  )
}

export default Videogames