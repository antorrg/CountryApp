import { combineReducers } from 'redux';
import publicReducer from './publicReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  public: publicReducer,
  admin: adminReducer,
});

export default rootReducer;
