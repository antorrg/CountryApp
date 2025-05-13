import {Routes, Route} from 'react-router-dom'
import {About, Contact, Home,CountryDetail} from './index.jsx'
import Header from '../Components/header/Header'

const PublicApp = ({toggleTheme, theme}) => {
  return (
    <div>
        <Header toggleTheme={toggleTheme} theme={theme}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:name" element={<CountryDetail/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </div>
  )
}

export default PublicApp