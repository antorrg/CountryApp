import {Link} from 'react-router-dom'

const Experiences = ({experiences}) => {
  return (
    <div>
           <div className="col-md-6">
      <h4>🌍 Experiencias destacadas</h4>
      <div className="row">
        {experiences?.map(exp => (
          <div className="col-12 mb-3" key={exp.id}>
            <Link to={`/experiences/${exp.id}`} className="text-decoration-none">
              <div className="card shadow-sm p-2 h-100">
                <h6>{exp.title}</h6>
                <p className="text-muted" style={{fontSize: '0.9rem'}}>{exp.description.slice(0, 100)}...</p>
                <span className="badge bg-success">⭐ {exp.rating}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Experiences