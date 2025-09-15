import {useParams, useNavigate, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'
import {getCountryById }from '../Redux/publics/publicActions'
import Experiences from '../Components/Experiences/Experiences'


const CountryDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const country = useSelector(state => state.public.countryById)
  const {id} = useParams()

  useEffect(()=>{
    dispatch(getCountryById(id))
  },[id])

  return (
    <div className='backgroundPages'>
    <div className='container'>
      <div className="row">
        {/* Datos del país */}
        <div className="col-md-8">
          <div className="card p-3" style={{maxWidth:'30rem', height:'30rem'}}>
            <Link to='/home' style={{ textDecoration: 'none' }}>
            <h3>{country.name}</h3>
            <img src={country.flagImage} alt="flag" className="img-fluid my-2" style={{maxHeight:'16rem'}} />
            <p><strong>Capital: </strong> {country.capital}</p>
            <p><strong>Región: </strong>{country.region}</p>
            <p><strong>Población: </strong>{country.population}</p>
            </Link>
          </div>
        </div>
        <div className='col-md-4'>
          <Experiences/>
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
    </div>
  )
}

export default CountryDetail