import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCountries }from '../Redux/publics/publicActions'
import CountryCards from '../Components/cards/CountryCards'
import Pagination from '../Components/Pagination/Pagination'


const Home = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=> state.public.countries)
  useEffect(()=>{
    dispatch(getCountries())
  },[])
  return (
    <div className="container-xxl flex-column backgroundPages" style={{minHeight: "100vh"}}> 
    <Pagination/>
    <CountryCards info={data} relativeRoute={'detail'}/>
    </div>
  )
}

export default Home