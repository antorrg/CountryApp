import React from 'react'
//import '../GeneralStyles/landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="cover">
      <div className="coverBack">
      <h1>Explora mundo</h1>
      <p>¡Bienvenido a nuestra página de inicio!</p>
      <p>Aquí puede hallar información acerca de nuestra app.</p>
      <p>Sientase libre de explorar y aprender acerca de lo que le ofrecemos.</p>
      <p>Si tiene alguna pregunta, no dude en contactarnos!</p>
      {/* Add more content here as needed */}
      <Link to="/home"  className="btn btn-primary">
        Go to Home
      </Link>
      </div>
    </div>
  )
}

export default Landing