import {Link, useLocation} from 'react-router-dom'
import SearchBar from '../searchbar/SearchBar'

const Header = ({toggleTheme, theme}) => {
  const isHome = useLocation().pathname === '/home'
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>Navbar</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Envolvemos todo el contenido del collapse en un contenedor con flex responsivo */}
          <div className="w-100 d-lg-flex justify-content-between align-items-center">
            
            {/* Sección izquierda: nav links */}
           
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to={'/home'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/home/about'}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/home/contact'}>Contact</Link>
              </li>
            </ul>

            {/* Sección derecha: botones */}
            {isHome &&
            <>
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 mt-3 mt-lg-0">
            <SearchBar />
             
              <button className="btn btn-sm btn-outline-primary">Sign In</button>
              <button 
                onClick={toggleTheme} 
                className="btn btn-sm btn-outline-secondary"
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>
            </>
          }
          </div>
        </div>
      </div>
    </nav> 
    </div>
  )
}

export default Header

/*  <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Contact</a>
              </li>
            </ul>
         
          <div className="d-flex justify-content-end align-items-center px-3 py-2">
          
          <button className="btn btn-sm btn-primary me-2 mt-4">Sign In</button>
        
          <button 
         onClick={toggleTheme} 
         className="btn btn-sm btn-outline-secondary mt-4 me-1"
       >
         {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
       </button>
       </div>
       </div>
        </div>
      </nav>  
    </div>*/