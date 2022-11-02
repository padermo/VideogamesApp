import { GET_VIDEOGAME } from "./actions";

const initialState = {
  videogames: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAME:
      return {
        ...state,
        videogames: action.payload
      }
    default:
      return state;
  }
}