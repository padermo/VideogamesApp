import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getVideogame, getGenres } from '../../redux/actions';
import Videogame from './Videogame';
import Btn from '../Buttons/Btn';

function Videogames() {
  let dispatch = useDispatch();
  let state = useSelector(state => state.videogames);
  let state2 = useSelector(state => state.genres);

  // estados paginado
  const [datos, setDatos] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  // estado vistas filtro ordenamiento
  const [vista, setVista] = useState({
    asc: false,
    desc: false,
    mayor: false,
    menor: false
  })

  // cuando se carga el componente despacha la accion y llena el state con todos los datos
  useEffect(() => {
    dispatch(getVideogame());
  }, [dispatch])
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])


  // ! CREAMOS PAGINADO
  let itemsPage = 15;
  
  // cuando se llenan todos los datos en el state, llenamos datos
  useEffect(() => {
    if (state.length === 1) {
      setDatos([...state])
    } else {
      setDatos([...state].splice(0, 15))
    }
  }, [state, vista])
  
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

  // ! CREANDO FILTROS DE ORDENAMIENTO ASC - DESC
  const selectSort = (e) => {
    switch (e.target.value) {
      case 'asc':
        setDatos(state.sort((a, b) => {
          setVista({
            asc: true,
            desc: false,
            mayor: false,
            menor: false
          })
          setCurrentPage(0)
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }))
        break;
      case 'desc':
        setDatos(state.sort((a, b) => {
          setVista({
            asc: false,
            desc: true,
            mayor: false,
            menor: false
          })
          setCurrentPage(0)
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        }))
        break;
      case 'mayor':
        setDatos(state.sort((a, b) => {
          setVista({
            asc: false,
            desc: false,
            mayor: true,
            menor: false
          })
          setCurrentPage(0)
          return b.rating - a.rating
        }))
        break;
      case 'menor':
        setDatos(state.sort((a, b) => {
          setVista({
            asc: false,
            desc: false,
            mayor: false,
            menor: true
          })
          setCurrentPage(0)
          return a.rating - b.rating
        }))
        break;
      default:
        break;
    }
  }

  console.log(state2)

  return (
    <div className='container-videogames'>
      <div className="container-interno-videogames">
        <div className="container-options-videogames">
          <div className="btn-page-videogames">
            <Btn onClick={next} name={"Next"} />
            <label>Page: {currentPage + 1}</label>
            <Btn onClick={prev} name={"Prev"} />
          </div>
          <div className="options-filter-videogames">
            <select onChange={selectSort}>
              <option value="#">Seleccione filtro</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
              <option value="mayor">Mayor Puntaje</option>
              <option value="menor">Menor Puntaje</option>
            </select>
          </div>
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