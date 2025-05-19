```javascript
import axios from 'axios';
import { showSuccess, HandlError } from "./HandlerError";

const handleError = HandlError;

class BaseEndpoints {
  constructor(baseURL, validHeader = false, tokenKey = 'validToken') {
    this.baseURL = baseURL;
    this.validHeader = validHeader;
    this.tokenKey = tokenKey;
  }

  setAuthHeader() {
    const config = { headers: {} };

    if (this.validHeader) {
      const token = typeof window !== 'undefined' ? localStorage.getItem(this.tokenKey) : null;
      if (!token) {
        throw new Error('Token no encontrado. Es posible que la sesión haya expirado.');
      }
      config.headers['x-access-token'] = token;
    }

    return config;
  }
  async sender (axiosFunction, auxFunction= null, rejectFunction= null,  message = 'Operación exitosa'){
    try {
        const response = await axiosFunction()
      showSuccess(message);
      if (auxFunction) await auxFunction();
      return response
    } catch (error) {
         handleError(error);
      if (rejectFunction) await rejectFunction();
    }
  }
  async sendPost(endpoint, data){
     const config = this.setAuthHeader();
      const response = await axios.post(`${this.baseURL}/${endpoint}`, data, config);
      return response
  }
  async sendPut(endpoint, data){
      const config = this.setAuthHeader();
      const response = await axios.put(`${this.baseURL}/${endpoint}`, data, config);
  }
  async sendDelete(endpoint){
     const config = this.setAuthHeader();
    const response = await axios.delete(`${this.baseURL}/${endpoint}`, config);
  }
  

  async get(endpoint, params = {}, auxFunction = null) {
    try {
      const config = this.setAuthHeader();
      const response = await axios.get(`${this.baseURL}/${endpoint}`, {
        ...config,
        params,
      });
      if (auxFunction) await auxFunction();
      return response.data;
    } catch (error) {
       handleError(error);
    }
  }

  async post(endpoint, data = {}, auxFunction = null, rejectFunction = null, message = 'Operación exitosa') {
   const executePost = sender(sendPost, auxFunction, rejectFunction, message)
  }

  async put(endpoint, data = {}, auxFunction = null, rejectFunction = null, message = 'Actualización exitosa') {
    try {
      const config = this.setAuthHeader();
      const response = await axios.put(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(message);
      if (auxFunction) await auxFunction();
      return response.data;
    } catch (error) {
      handleError(error);
      if (rejectFunction) await rejectFunction();
    }
  }

  async delete(endpoint, auxFunction = null, rejectFunction = null, message = 'Eliminación exitosa') {
    try {
      const config = this.setAuthHeader();
      const response = await axios.delete(`${this.baseURL}/${endpoint}`, config);
      showSuccess(message);
      if (auxFunction) await auxFunction();
      return response.data;
    } catch (error) {
      handleError(error);
      if (rejectFunction) await rejectFunction();
    }
  }
}

export default BaseEndpoints;
```