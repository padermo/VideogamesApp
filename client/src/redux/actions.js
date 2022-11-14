import axios from 'axios';

export const GET_VIDEOGAME = 'GET_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';
export const GET_DETAIL = 'GET_DETAIL';

export const getVideogame = () => {
  return async (dispatch) => {
    let pedido = await axios.get('http://localhost:3001/videogames')
    dispatch({ type: GET_VIDEOGAME, payload: pedido.data });
  }
}

export const searchVideogame = (value) => {
  return async (dispatch) => {
    let pedido = await axios.get(`http://localhost:3001/videogames?search=${value}`)
    dispatch({ type: SEARCH_VIDEOGAME, payload: pedido.data });
  }
}

export const getGenres = () => {
  return async (dispatch) => {
    let pedido = await axios.get('http://localhost:3001/genres')
    dispatch({ type: GET_GENRES, payload: pedido.data });
  }
}

export const getDetail = (idVideogame) => {
  return async (dispatch) => {
    let pedido = await axios.get(`http://localhost:3001/videogames/${idVideogame}`)
    dispatch({ type: GET_DETAIL, payload: pedido.data });
  }
}