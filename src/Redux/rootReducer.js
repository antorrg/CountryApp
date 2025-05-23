import { combineReducers } from 'redux';
import publicReducer from './publics/publicReducer'
import adminReducer from './admin/adminReducer';
import filterReducer from './filters/filterReducer';

const rootReducer = combineReducers({
  public: publicReducer,
  admin: adminReducer,
  filter: filterReducer,
});

export default rootReducer;
