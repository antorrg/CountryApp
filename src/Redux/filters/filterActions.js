export const SET_NAME = 'SET_NAME';
export const SET_REGION = 'SET_REGION';
export const SET_PAGE = 'SET_PAGE';
export const SET_ORDER = "SET_ORDER";
export const RESET_FILTERS = 'RESET_FILTERS';

export const setName = (name) => ({ type: SET_NAME, payload: name });
export const setRegion = (region) => ({ type: SET_REGION, payload: region });
export const setPage = (page) => ({ type: SET_PAGE, payload: page });
export const setOrder = (order) => ({ type: SET_ORDER, payload: order });
export const resetFilters = () => ({ type: RESET_FILTERS });