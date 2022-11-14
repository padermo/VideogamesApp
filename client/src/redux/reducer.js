import { GET_VIDEOGAME, GET_GENRES, SEARCH_VIDEOGAME } from "./actions";

const initialState = {
  videogames: [],
  videogame: [],
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
    case SEARCH_VIDEOGAME:
      return {
        ...state,
        videogame: action.payload
      }
    default:
      return state;
  }
}