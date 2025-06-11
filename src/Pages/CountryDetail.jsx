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
    </div>
  )
}

export default CountryDetail