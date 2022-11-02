import { GET_VIDEOGAME, GET_GENRES } from "./actions";

const initialState = {
  videogames: [],
  genres: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAME:
      return {
        ...state,
        videogames: action.payload
      }
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      }
    default:
      return state;
  }
}