import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {BrowserRouter} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import store from './Redux/store.js'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import axios from 'axios'


axios.defaults.baseURL =import.meta.env.VITE_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <App />
        <ToastContainer/>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>,
)
