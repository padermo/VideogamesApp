import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from '../../redux/actions';
import Detail from './Detail'

function Details({ match }) {
  let dispatch = useDispatch();
  let state = useSelector(state => state.detail);

  useEffect(() => {
    dispatch(getDetail(match.params.id))
  },[dispatch, match.params.id])

  return (
    <div className='container-details'>
      <div className="container-interno-details">
        {
          !state.length ?
            <Detail key={state.id} name={state.name} image={state.image} release={state.release} rating={state.rating} platform={state.platform} genre={state.genres} description={state.description} />
            :
            "Cargando datos"
        }
      </div>
    </div>
  )
}

export default Details