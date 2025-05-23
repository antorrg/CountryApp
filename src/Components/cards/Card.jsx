import {Link} from 'react-router-dom'

const Card = ({info, relativeRoute}) => {
  
  return (
    <div className='card'>
      <Link to={`/${relativeRoute}/${info.id}`}>
      <h5>{info.name}</h5>
      <h6>{info.code}</h6>
      {/* <p>{info.flagEmoji}</p> */}
      <img src={info.flagImage} className='imageCard'/>
      <div className='content'>
        <strong style={{margin:'0'}}>Capital:</strong>
        <p style={{fontSize:'0.9rem'}}>{info.capital}</p>
      </div>
      <div className='content'>
        <strong style={{margin:'0'}}>Region:</strong>
        <p style={{fontSize:'0.9rem'}}>{info.region}</p>
      </div>
      
      </Link>
    </div>
  )
}

export default Card