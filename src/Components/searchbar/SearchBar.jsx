import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { getCountries } from '../../Redux/publics/publicActions'


const SearchBar = () => {
 const dispatch = useDispatch()
 const [showSearch, setShowSearch] = useState(false)
 const [country, setCountry] = useState(true)
 const [query, setQuery] = useState('')
  const toggleSearch = () => {
      setShowSearch(!showSearch)
    }
  const handleSwitch = ()=>{
    setCountry(!country)
  }
  const searchConfig = country
    ? {
        title: 'Country',
        placeholder: 'Search country...',
      }
    : {
        title: 'Region',
        placeholder: 'Search region...',
      };


    const handleSearch = () => {
      if (query.trim()) {
          const searchType = country ? 'name' : 'region';
        console.log(`Buscar por ${searchType}:`, query);
        // Aquí podrías llamar a una función que haga fetch a una API
        dispatch(getCountries({[searchType]:query}))
        setQuery('')
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
               <button className="btn btn-sm btn-outline-info ms-1 me-2" onClick={handleSwitch}>
              {searchConfig.title}
            </button>
              <input 
              type="text" 
              className="form-control search-input" 
              placeholder={searchConfig.placeholder}  
              value={query}
              onChange={(e) => setQuery(e.target.value)}/>
              <button className="btn btn-sm btn-outline-success ms-1 me-2" onClick={handleSearch}>
              Search
            </button>
            </>
            )}
          </div>
    </div>
  )
}

export default SearchBar