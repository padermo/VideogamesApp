import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getVideogame, getGenres } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Videogame from './Videogame';
import Btn from '../Buttons/Btn';

function Videogames() {
  let dispatch = useDispatch();
  let state = useSelector(state => state.videogames);
  let state2 = useSelector(state => state.genres);
  let state3 = useSelector(state => state.videogame);


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

  
  // TODO! CREAMOS PAGINADO
  let itemsPage = 15;
  
  // cuando se llenan todos los datos en el state, llenamos datos
  useEffect(() => {
    if (state3.length) {
      setDatos([...state3].splice(0, 15))
    } else {
      setDatos([...state].splice(0, 15))
    }
  }, [state, state3, vista])
  
  // nextpage
  const next = () => {
    if (state3.length) {
      const totalElements = state3.length;
      const nextPage = currentPage + 1;
      const index = nextPage * itemsPage;
      if (index >= totalElements) return;
      setDatos([...state3].splice(index, itemsPage));
      setCurrentPage(nextPage)
    }

    else if (state.length) {
      const totalElements = state.length;
      const nextPage = currentPage + 1;
      const index = nextPage * itemsPage;
      if (index >= totalElements) return;
      setDatos([...state].splice(index, itemsPage));
      setCurrentPage(nextPage)
    }
  }

  // prevpage
  const prev = () => {
    if (state3.length) {
      const prevPage = currentPage - 1;
      if (prevPage < 0) return;
      const index = prevPage * itemsPage;
      setDatos([...state3].splice(index, itemsPage));
      setCurrentPage(prevPage);
    }

    else if (state.length) {
      const prevPage = currentPage - 1;
      if (prevPage < 0) return;
      const index = prevPage * itemsPage;
      setDatos([...state].splice(index, itemsPage));
      setCurrentPage(prevPage);
    }
  }

  // TODO! CREANDO FILTRO POR EXISTENCIAS EN BD O API
  const selectContent = (e) => {
    if (e.target.value === "api") {
      let arreglo = [];
      state.map(j => {
        if (typeof(j.id) === 'number') {
          arreglo.push(j)
        }
        return j
      })
      setDatos([...arreglo].slice(0, 15))
    }

    else if (e.target.value === "db") {
      let arreglo = [];
      state.map(j => {
        if (typeof (j.id) === 'string') {
          arreglo.push(j)
        }
        return j
      })
      setDatos([...arreglo].slice(0, 15))
    }
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

  // ! CREANDO FILTRO POR GENERO
  const selectGenre = (e) => {
    let arreglo = [];
    for (let i = 0; i <= state.length; i++){
      if (state[i]?.genre?.includes(e.target.value)) {
        arreglo.push(state[i])
      }
    }
    setDatos(arreglo);
  }

  

  return (
    <div className='container-videogames'>
      <div className="container-interno-videogames">
        <div className="container-options-videogames">
          <div className="btn-page-videogames">
            <Btn onClick={prev} name={"Prev"} />
            <label>Page: {currentPage + 1}</label>
            <Btn onClick={next} name={"Next"} />
          </div>

          <div className="options-filter-videogames">
            <select onChange={selectSort}>
              <option value="#">Seleccione filtro</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
              <option value="mayor">Mayor Puntaje</option>
              <option value="menor">Menor Puntaje</option>
            </select>

            <select onChange={selectGenre}>
              <option defaultValue="#">Seleccione genero</option>
              {
                state2.length ?
                  state2.sort((a, b) => {
                  if (a.name < b.name) return -1
                  if (a.name > b.name) return 1
                  return 0
                }).map(e => (
                    <option value={e.name} key={e.id}>{e.name}</option>
                  ))
                  : ""
              }
            </select>

            <select onChange={selectContent}>
              <option value="#">Seleccione datos</option>
              <option value="api">Datos API</option>
              <option value="db">Datos DB</option>
            </select>
          </div>
        </div>

        <div className="container-info-videogames">
          {
            datos.length ?
              datos.map(e => (
                <Link to={`/detail/${e.id}`} key={e.id}>
                  <Videogame name={e.name} genre={e.genre} image={e.image} />
                </Link>
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