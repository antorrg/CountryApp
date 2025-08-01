// hooks/useReduxFetch.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useReduxFetch(actionCreator, selector, params = [], deps = []) {
  const dispatch = useDispatch();
  const state = useSelector(selector);

  useEffect(() => {
    dispatch(actionCreator(...params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ...deps]);

  return state;
}
