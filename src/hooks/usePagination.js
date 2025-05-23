// hooks/usePagination.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../Redux/publics/publicActions';

export const usePagination = () => {
  const dispatch = useDispatch();
  const numberPage = useSelector((state) => state.public.currentPage) || 1;
  const totalPages = useSelector((state) => state.public.totalPages) || 1;

  const [inputMode, setInputMode] = useState(false);
  const [inputPage, setInputPage] = useState(numberPage);

  useEffect(() => {
    dispatch(getCountries({ page: inputPage }));
  }, [inputPage]);

  const setPageSafely = (newPage) => {
    const pageNumber = Number(newPage);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setInputPage(pageNumber);
    } else {
      alert('Por favor, ingresa un número de página válido.');
    }
    setInputMode(false);
  };

  return {
    page: numberPage,
    totalPages,
    inputMode,
    inputPage,
    setInputMode,
    setInputPage,
    setPageSafely,
  };
};
