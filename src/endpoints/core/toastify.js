import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 
  const showError = (error) => {
    console.log('Error: ', error)
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data.message;
        toast.error(`Error ${status}. ${data}`);
      }else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      toast.error('No se recibió respuesta del servidor.')
     }
    } 

const showSuccess = (mensaje) => {
  toast.success(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};

const showInfo = (mensaje) => {
  toast.info(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};
const showWarn = (mensaje) => {
  toast.warn(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};
export {
    showError,
    showInfo,
    showSuccess,
    showWarn
};