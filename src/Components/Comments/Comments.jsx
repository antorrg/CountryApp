import React from 'react'

const Comments = ({comments}) => {
  return (
    <div>
         <div className="mt-5">
    <h4>🗣️ Comentarios de viajeros</h4>
    <div className="row">
      {comments?.map(comment => (
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
  )
}

export default Comments