import {useParams, useNavigate, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'
import {getCountryById }from '../Redux/publics/publicActions'


const CountryDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const country = useSelector(state => state.public.countryById)
  const {id} = useParams()

  useEffect(()=>{
    dispatch(getCountryById(id))
  },[id])

  return (
    <div className='container'>
      <Link to='/home'>
      Volver
      </Link>
       <h5>{country.name}</h5>
      <h6>{country.code}</h6>
      {/* <p>{info.flagEmoji}</p> */}
      <img src={country.flagImage} className='imageCard'/>
      <div className='content'></div>
          <div className="container my-4">
      <div className="row">
        {/* Datos del país */}
        <div className="col-md-6">
          <div className="card p-3">
            <h3>Andorra 🇦🇩</h3>
            <img src="https://flagcdn.com/w320/ad.png" alt="flag" className="img-fluid my-2" />
            <p><strong>Capital:</strong> Andorra la Vella</p>
            <p><strong>Región:</strong> Europa</p>
            <p><strong>Población:</strong> 77.265</p>
          </div>
        </div>

        {/* Experiencias destacadas */}
        <div className="col-md-6">
          <h4>🌍 Experiencias destacadas</h4>
          <div className="row">
            <div className="col-12 mb-3">
              <Link to="/experiences/1" className="text-decoration-none">
                <div className="card shadow-sm p-2 h-100">
                  <h6>Senderismo en los Pirineos</h6>
                  <p className="text-muted" style={{fontSize: '0.9rem'}}>Una aventura inolvidable en las montañas...</p>
                  <span className="badge bg-success">⭐ 4.9</span>
                </div>
              </Link>
            </div>

            <div className="col-12 mb-3">
              <Link to="/experiences/2" className="text-decoration-none">
                <div className="card shadow-sm p-2 h-100">
                  <h6>Visita al casco histórico</h6>
                  <p className="text-muted" style={{fontSize: '0.9rem'}}>Descubrí la historia de Andorra caminando por sus calles...</p>
                  <span className="badge bg-success">⭐ 4.7</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="mt-5">
        <h4>🗣️ Comentarios de viajeros</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card h-100 p-3">
              <p style={{fontSize: '0.9rem'}}>"Hermoso lugar, la naturaleza es increíble y la comida deliciosa..."</p>
              <div className="text-end">
                <small className="text-muted">— Lucía</small>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card h-100 p-3">
              <p style={{fontSize: '0.9rem'}}>"Me encantó el centro histórico y la amabilidad de la gente..."</p>
              <div className="text-end">
                <small className="text-muted">— Diego</small>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card h-100 p-3">
              <p style={{fontSize: '0.9rem'}}>"Volvería sin dudarlo. Muy seguro, limpio y pintoresco."</p>
              <div className="text-end">
                <small className="text-muted">— Sofía</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CountryDetail