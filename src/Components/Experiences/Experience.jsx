import {Link, useLocation} from 'react-router-dom'

const Experience = ({exp}) => {
  const location = useLocation()

  const conditionalLink = exp.id=== 'sinIdporelmomentos'? location.pathname: `/home/detail/experience/${exp.id}`
  return (
      <div className="row shadow-sm">
          <div className="col-12 mb-3" key={exp.id}>
            <Link to={conditionalLink} className="text-decoration-none">
              <div className="card shadow-md p-2 h-100">
                <h6>{exp.title}</h6>
                <p className="text-muted" style={{fontSize: '0.9rem'}}>{exp.description.slice(0, 100)}...</p>
                <span className="badge bg-success">⭐ {exp.rating}</span>
              </div>
            </Link>
          </div>
      </div>

  )
}

export default Experience