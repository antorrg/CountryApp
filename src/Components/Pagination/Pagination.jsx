import PaginationControls from './PaginationControls';
import { usePagination } from '../../hooks/usePagination';

const Pagination = () => {
  const pagination = usePagination();
  return <PaginationControls {...pagination} />;
};

export default Pagination;

// import {useEffect, useState} from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import {getCountries} from '../../Redux/publics/publicActions'

// const Pagination = () => {
//     const dispatch = useDispatch()
//     const numberPage = useSelector((state) => state.public.currentPage)
//     const totalPagesState = useSelector((state) => state.public.totalPages)
//     const page= numberPage|| 1
//     const totalPages = totalPagesState || 1
//   const [inputMode, setInputMode] = useState(false); // Modo para mostrar el input
//   const [inputPage, setInputPage] = useState(page); // Estado para el valor del input
// useEffect(()=>{
//     dispatch(getCountries({page:inputPage}))
// },[inputPage])

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       const pageNumber = Number(inputPage);
//       if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages && !pageNumber) {
//         setInputPage(pageNumber);
//       } else {
//         alert('Por favor, ingresa un número de página válido.');
//       }
//       setInputMode(false); // Salir del modo de edición
//     } else if (e.key === 'Escape') {
//       setInputMode(false); // Salir del modo de edición sin guardar
//     }
//   };
//   const handleBlur = () => {
//     setInputMode(false); // Salir del modo de edición al perder foco
//   };


//   return (
//     <div className='mt-1 mb-1'>
//     <button className='btn btn-sm btn-primary me-2' onClick={()=>setInputPage(1)} disabled={page===1}>First</button>
//     <button className='btn btn-sm btn-primary me-2' onClick={()=>setInputPage(page-1)} disabled={page===1}>Prev</button>
//     {/* <span >Page {page} from {totalPages}</span> */}
//     <span className='ms-2 me-2'>
//         Page{' '}
//         {inputMode ? (
//           <input
//             className='btn btn-sm btn-primary'
//             type="number"
//             value={inputPage}
//             onChange={(e) => setInputPage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             onBlur={handleBlur}
//             autoFocus
//             style={{ width: '4rem', textAlign: 'center'}}
//             min="1"
//             max={totalPages}
//           />
//         ) : (
//           <strong onClick={() => setInputMode(true)} style={{ cursor: 'pointer' }}>
//             {page}
//           </strong>
//         )}{' '}
//         of {totalPages}
//       </span>
//     <button className='btn btn-sm btn-primary me-2' onClick={()=>setInputPage(page+1)} disabled={page===totalPages}>Next</button>
//     <button className='btn btn-sm btn-primary me-2' onClick={()=>setInputPage(totalPages)} disabled={page===totalPages}>Last</button>
//     </div>
//   )
// }

// export default Pagination