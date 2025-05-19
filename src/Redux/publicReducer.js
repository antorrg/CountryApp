import {
  PUBLIC_ALL_COUNTRIES,
  PUBLIC_COUNTRY_BY_ID,

} from './actions'
const initialState = {
    countries: [],
    countryById: [],
    currentPage: 1,
    totalPages:1,
  };
  
  export default function publicReducer(state = initialState, {type, payload}) {
    switch (type) {
      case PUBLIC_ALL_COUNTRIES:
        return { 
          ...state, 
        countries: payload.results,
        currentPage: payload.info.page,
        totalPages: payload.info.totalPages 
      }
      case PUBLIC_COUNTRY_BY_ID:
        return {
          ...state,
          countryById: payload
        }
      default:
        return state;
    }
  }
  