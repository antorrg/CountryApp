<div className="container my-4">
  <div className="row">
    {/* Datos principales del país */}
    <div className="col-md-6">
      <div className="card p-3">
        <h3>{country.name} {country.flagEmoji}</h3>
        <img src={country.flagImage} alt="flag" className="img-fluid my-2" />
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Región:</strong> {country.region}</p>
        <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
      </div>
    </div>

    {/* Experiencias destacadas */}
    <div className="col-md-6">
      <h4>🌍 Experiencias destacadas</h4>
      <div className="row">
        {experiences.map(exp => (
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

  {/* Comentarios */}
  <div className="mt-5">
    <h4>🗣️ Comentarios de viajeros</h4>
    <div className="row">
      {comments.map(comment => (
        <div className="col-md-4 mb-3" key={comment.id}>
          <div className="card h-100 p-3">
            <p style={{fontSize: '0.9rem'}}>"{comment.text.slice(0, 120)}..."</p>
            <div className="text-end">
              <small className="text-muted">— {comment.user}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
