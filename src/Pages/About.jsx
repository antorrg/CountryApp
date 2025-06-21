import React from 'react'
import Header from '../Components/header/Header'

const About = () => {
  return (
    <div className='backgroundOnlyImage d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
    <div className="container-sm d-flex flex-column justify-content-center align-items-center">
      <div className="coverBack">
     <h2>Explora mundo o Countries:</h2>
     <p>Esta aplicación es la continuidad a un desafío personal nacido en los proyectos individuales de Henry. Si bien por persona y por cursada solo habia uno, tanto a mi como a algunos de mis compañeros se nos ocurrió que estaria muy bueno rehacerlos por gusto, practica, aprendizaje y diversión. Este llevó mucho mas tiempo de lo esperado, pero al fin dio frutos.
     </p>
     <p>
      Replica el PI de Countries pero con la diferencia que tiene un login completo, un sistema de experiencias en lugar de las actividades por pais, y está hecho con base de datos mongoDb y mongoose. Utiliza un sistema de mensajeria con node-mailer, moderacion automatica y supervisada, gestion de imagenes y videos, tanto por admin como por el propio usuario.
     </p>
     </div>
     </div>
    </div>
  )
}

export default About