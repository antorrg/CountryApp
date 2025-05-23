// components/PaginationControls.js
const PaginationControls = ({
  page,
  totalPages,
  inputMode,
  inputPage,
  setInputPage,
  setInputMode,
  setPageSafely,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setPageSafely(inputPage);
    } else if (e.key === 'Escape') {
      setInputMode(false);
    }
  };

  const handleBlur = () => setInputMode(false);

  return (
    <div className='mt-1 mb-1'>
      <button className='btn btn-sm btn-primary me-2' onClick={() => setInputPage(1)} disabled={page === 1}>
        First
      </button>
      <button className='btn btn-sm btn-primary me-2' onClick={() => setInputPage(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span className='ms-2 me-2'>
        Page{' '}
        {inputMode ? (
          <input
            className='btn btn-sm btn-primary'
            type='number'
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
            style={{ width: '4rem', textAlign: 'center' }}
            min='1'
            max={totalPages}
          />
        ) : (
          <strong onClick={() => setInputMode(true)} style={{ cursor: 'pointer' }}>
            {page}
          </strong>
        )}{' '}
        of {totalPages}
      </span>

      <button className='btn btn-sm btn-primary me-2' onClick={() => setInputPage(page + 1)} disabled={page === totalPages}>
        Next
      </button>
      <button className='btn btn-sm btn-primary me-2' onClick={() => setInputPage(totalPages)} disabled={page === totalPages}>
        Last
      </button>
    </div>
  );
};

export default PaginationControls;
