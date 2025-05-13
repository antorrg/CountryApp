const initialState = {
    users: [],
   
  };
  
  export default function adminReducer(state = initialState, {type, payload}) {
    switch (type) {
      case 'ADMIN/SET_USERS':
        return { 
            ...state, 
            users: payload };
   
      default:
        return state;
    }
  }
  