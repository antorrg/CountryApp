import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCountries }from '../Redux/publics/publicActions'


const Home = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=> state.public.countries)
  useEffect(()=>{
    dispatch(getCountries())
  },[])
  return (
    <div className="backgroundPages" style={{minHeight: "100vh"}}> 
    
    {data?.map((dt)=>
    <div key={dt.id}style={{maxHeight:'160px', border:'1px solid black', margin:'5px'}} className='backgroundFormColor'>
      <h5>name: {dt.name}</h5>
      <img src={dt.flagImage} alt='not found'style={{width:'80px'}}/>
    </div>
  )}
    </div>
  )
}

export default Home