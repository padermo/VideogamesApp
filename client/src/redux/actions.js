import axios from 'axios';

export const GET_VIDEOGAME = 'GET_VIDEOGAME';

export const getVideogame = () => {
  return async (dispatch) => {
    let pedido = await axios.get('http://localhost:3001/videogames')
    dispatch({ type: GET_VIDEOGAME, payload: pedido.data });
  }
}