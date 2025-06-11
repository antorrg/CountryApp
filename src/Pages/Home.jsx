import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCountries }from '../Redux/publics/publicActions'
import CountryCards from '../Components/cards/CountryCards'
import Pagination from '../Components/Pagination/Pagination'


const Home = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=> state.public.countries)
  const  { currentPage, name, sort, region,} = useSelector((state) => state.filter);

  useEffect(()=>{
    const query = {page:currentPage, name, sort, region}
    console.log('soy la query', query)
    dispatch(getCountries(query))
  },[currentPage, name, sort, region,])

  return (
    <div className="container-xxl flex-column backgroundPages" style={{minHeight: "100vh"}}> 
    <Pagination/>
    <CountryCards info={data} relativeRoute={'home/detail'}/>
    </div>
  )
}

export default Home