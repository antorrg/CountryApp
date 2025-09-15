import {Link, useParams} from 'react-router-dom'
import { useReduxFetch } from '../../hooks/useReduxFetch'
import { getExperiencesByCountryId } from '../../Redux/publics/publicActions'
import Experience from './Experience'

const Experiences = () => {
const {id} = useParams()
 const expFound= useReduxFetch(getExperiencesByCountryId, state => state.public.experiences, [id],  [id])
  return (
    <div>
      {/* <div className="col-md-4"> */}
      <h4 className='text-body'>🌍 Experiencias destacadas</h4>
      <button className="badge bg-success">Nueva experiencia</button>
      <div className="row">
        {expFound?.map(exp => (
          <Experience key={exp.id} exp={exp}/>
        ))}
      </div>
    </div>
  // </div>
  )
}

export default Experiences