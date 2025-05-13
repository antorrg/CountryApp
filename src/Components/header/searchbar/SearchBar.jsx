import {useState} from 'react'


const SearchBar = () => {
 const [showSearch, setShowSearch] = useState(false)
 const [query, setQuery] = useState('')
  const toggleSearch = () => {
      setShowSearch(!showSearch)
    }
    const handleSearch = () => {
      if (query.trim()) {
        console.log('Buscar:', query)
        // Aquí podrías llamar a una función que haga fetch a una API
      }
    }
  return (
    <div className='d-flex align-items-center'>
      <div className="d-flex align-items-center">
            <button onClick={toggleSearch} className="btn btn-link">
              🔍
            </button>
            {showSearch && (
              <>
              <input type="text" className="form-control search-input" placeholder="Buscar país..." />
              <button className="btn btn-sm btn-outline-success ms-1 me-2" onClick={handleSearch}>
              Buscar
            </button>
            </>
            )}
          </div>
    </div>
  )
}

export default SearchBar