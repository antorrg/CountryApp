import {
   SET_NAME,
   SET_REGION,
   SET_PAGE, 
   SET_ORDER,
   RESET_FILTERS
} from './filterActions'

const initialState = {
    currentPage: 1,
    name: '',
    sort: 'asc',
    region: '',
  };
  
  export default function filterReducer(state = initialState, {type, payload}) {
    switch (type) {

        case SET_NAME:
          return { 
            ...state, 
            name: payload, 
            currentPage: 1 
          };
        case SET_REGION:
          return { 
            ...state, 
            region: payload, 
            currentPage: 1 
          };
        case SET_PAGE:
          return { 
            ...state, 
            currentPage: payload 
          };
        case SET_ORDER:
            return {
                ...state,
                sort: payload
            }
        case RESET_FILTERS:
          return {
            ...state,
            currentPage: 1, 
            name: '', 
            sort: 'asc', 
            region: ''
          }
      default:
        return state;
    }
  }
  