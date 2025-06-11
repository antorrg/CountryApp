import {Suspense,lazy, useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
const PublicApp = lazy(() => import('./Pages/PublicApp.jsx'))
import {Landing} from './Pages/index.jsx'


function App() {
  const [theme, setTheme] = useState('auto')
 
  // Leer el tema guardado en localStorage
  useEffect(() => {
   const savedTheme = localStorage.getItem('theme');
   if (savedTheme) {
     setTheme(savedTheme); // Usa el tema guardado
   } else {
     // Si no hay tema guardado, determinar el tema por defecto
     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
     const defaultTheme = prefersDark ? 'dark' : 'light';
     setTheme(defaultTheme);
    
   }
 }, []);

 useEffect(()=>{
   document.documentElement.setAttribute('data-bs-theme', theme);
 },[theme])
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Guarda el tema en localStorage
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home/*" element={<PublicApp toggleTheme={toggleTheme} theme={theme}/>} />

        {/* <Route path="*" element={<h1>404 Not Found</h1>} />  */}
      </Routes>
      
    </>
    </Suspense>
    </div>
  )
}

export default App
