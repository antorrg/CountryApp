const initialState = {
    items: [],
  };
  
  export default function publicReducer(state = initialState, {type, payload}) {
    switch (type) {
      case 'PUBLIC/SET_ITEMS':
        return { ...state, items: payload };
      default:
        return state;
    }
  }
  