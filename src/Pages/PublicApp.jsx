import {Routes, Route} from 'react-router-dom'
import {About, Contact, Home,CountryDetail, DetailExperience} from './index.jsx'
import Header from '../Components/header/Header'

const PublicApp = ({toggleTheme, theme}) => {
  return (
    <div>
        <Header toggleTheme={toggleTheme} theme={theme}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<CountryDetail/>} />
        <Route path= "/detail/experience/:id" element={<DetailExperience/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </div>
  )
}

export default PublicApp