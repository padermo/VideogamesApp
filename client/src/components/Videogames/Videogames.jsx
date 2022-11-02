import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getVideogame } from '../../redux/actions';
import Videogame from './Videogame';
import Btn from '../Buttons/Btn';

function Videogames() {
  let dispatch = useDispatch();
  let state = useSelector(state => state.videogames);

  // ! CREAMOS ESTADO COPIA PAGINADO
  let itemsPage = 15;
  const [datos, setDatos] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  // cuando se carga el componente despacha la accion y llena el state con todos los datos
  useEffect(() => {
    dispatch(getVideogame());
  }, [dispatch])

  // cuando se llenan todos los datos en el state, llenamos datos
  useEffect(() => {
    if (state.length === 1) {
      setDatos([...state])
    } else {
      setDatos([...state].splice(0, 15))
    }
  }, [state])
  
  // nextpage
  const next = () => {
    const totalElements = state.length;
    const nextPage = currentPage + 1;
    const index = nextPage * itemsPage;
    if (index >= totalElements) return;
    setDatos([...state].splice(index, itemsPage));
    setCurrentPage(nextPage)
  }

  // prevpage
  const prev = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const index = prevPage * itemsPage;
    setDatos([...state].splice(index, itemsPage));
    setCurrentPage(prevPage);
  }
  
  console.log(datos)

  return (
    <div className='container-videogames'>
      <div className="container-interno-videogames">
        <div className="container-options-videogames">
          <Btn onClick={next} name={"Next"} />
          <Btn onClick={prev} name={"Prev"} />
        </div>

        <div className="container-info-videogames">
          {
            datos.length ?
              datos.map(e => (
                <Videogame name={e.name} genre={e.genre} image={e.image} />
              ))
              :
              "Cargando datos"
          }
        </div>{/* fin container info videogames*/}
      </div>{/* fin container interno videogames */}
    </div>
  )
}

export default Videogames