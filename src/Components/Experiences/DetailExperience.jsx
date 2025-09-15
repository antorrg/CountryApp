import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useReduxFetch } from '../../hooks/useReduxFetch'
import {useSelector, useDispatch} from 'react-redux'
import {getExperiencesById, publicCleanDetail} from '../../Redux/publics/publicActions'

const DetailExperience = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    console.log('soy el id en component: ', id)
   //const data = useSelector(state => state.public.experienceById)
    //console.log('soy la experience: ', data)

    useEffect(()=>{
        //dispatch(getExperiencesById(id))
        //return ()=>{dispatch (publicCleanDetail())}
    },[id])

    const goBack = ()=>{navigate(-1)}
    
  return (
    <div>
        {/* <h1>{data?.id}</h1> */}
        {/* <h2>todavia no hay datos {id}</h2> */}
        <h1>a ver que pasa</h1>
        <button onClick={goBack}>Volver</button>
        <img src='http://localhost:5173/uploads/edicion.png' alt='Not Found'/>
    </div>
  )
}

export default DetailExperience