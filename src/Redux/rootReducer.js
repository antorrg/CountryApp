import { combineReducers } from 'redux';
import publicReducer from './publics/publicReducer'
import adminReducer from './admin/adminReducer';

const rootReducer = combineReducers({
  public: publicReducer,
  admin: adminReducer,
});

export default rootReducer;
