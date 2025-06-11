import {
  PUBLIC_ALL_COUNTRIES,
  PUBLIC_COUNTRY_BY_ID,

} from './publicActions'
const initialState = {
    countries: [],
    countryById: [],
    totalPages:1,
  };
  
  export default function publicReducer(state = initialState, {type, payload}) {
    switch (type) {
      case PUBLIC_ALL_COUNTRIES:
        return { 
          ...state, 
        countries: payload.results,
        totalPages: payload.info.totalPages 
      }
      case PUBLIC_COUNTRY_BY_ID:
        return {
          ...state,
          countryById: payload.results
        }
      default:
        return state;
    }
  }
  