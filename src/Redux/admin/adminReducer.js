import {
  USERS,
  USERS_BY_ID
}from  './adminActions'

const initialState = {
    users: [],
    usersId: []
   
  };
  
  export default function adminReducer(state = initialState, {type, payload}) {
    switch (type) {
      case USERS:
        return { 
            ...state, 
            users: payload 
          }
      case USERS_BY_ID:
        return {
          ...state,
          usersId: payload
        }
   
      default:
        return state;
    }
  }
  