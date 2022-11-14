import { GET_VIDEOGAME, GET_GENRES, SEARCH_VIDEOGAME, GET_DETAIL } from "./actions";

const initialState = {
  videogames: [],
  videogame: [],
  genres: [],
  detail: []
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
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload
      }
    default:
      return state;
  }
}