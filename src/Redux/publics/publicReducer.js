import {
  PUBLIC_ALL_COUNTRIES,
  PUBLIC_COUNTRY_BY_ID,
  EXPERIENCES,
  EXPERIENCE_BY_ID,
  PUBLIC_CLEAN_DETAIL,

} from './publicActions'
const initialState = {
    countries: [],
    countryById: [],
    experiences:[],
    experienceById:[],
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
      case EXPERIENCES:
        return {
          ...state,
          experiences: payload.results
        }
      case EXPERIENCE_BY_ID:
        return {
          ...state,
          experienceById: payload.results
        }
      case PUBLIC_CLEAN_DETAIL:
        return {
          ...state,
          experienceById: [],
          countryById: []
        }
      default:
        return state;
    }
  }
  