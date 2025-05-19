import axios from 'axios'
import {showSuccess, showError} from "./toastify"
import {showConfirmationDialog} from './sweetalert'


export default class BaseEndpoints {
  constructor(baseURL, validHeader = false) {
    this.baseURL = baseURL;
    this.validHeader = validHeader;
  }

  setAuthHeader() {
    const token = localStorage.getItem('validToken');
    const config = { 
      headers: {},
      //withCredentials: true
     };
    if (token && this.validHeader) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
  async dialog(dialog='', asyncFunction = null){
    if(dialog.trim()){alert('Missing dialog')}
    const confirmed = await showConfirmationDialog(
      `${dialog}`
    );
    if (confirmed) {
      return await asyncFunction()
    }
  }

  async get(endpoint, params = {}, onSuccess = null, onReject = null, admin = false) {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.get(`${this.baseURL}/${endpoint}`, {
        ...config,
        params, // Agrega los parámetros como query string
      });
      if (onSuccess) await onSuccess();
      return response.data;
    } catch (error) {
      showError(error);
      if(onReject) await onReject()
        throw error
    }
  }


  async post(endpoint, data = {}, onSuccess = null, admin = false, onReject = null, confirmDialog= false, dialogMessage='', message= 'Operación exitosa') {
    const executePost = async () => {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.post(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(message);
      if (onSuccess) await onSuccess();
      return response.data;
    } catch (error) {
      showError(error);
      if (onReject) await onReject();
    }
  };

  if (confirmDialog) {
    return await this.dialog(dialogMessage, executePost);
  }

  return await executePost();
  }

  async put(endpoint, data = {}, onSuccess = null, admin = false, onReject= null, confirmDialog = false, dialogMessage = '', message = 'Actualización exitosa') {
     const executePut = async () => {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.put(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(message);
      if (onSuccess ) await onSuccess();
      return response.data;
    } catch (error) {
      showError(error);
      if (onReject) await onReject();
      throw error
    }
  };

  if (confirmDialog) {
    return await this.dialog(dialogMessage, executePut);
  }

  return await executePut();
  }

  async delete(endpoint, onSuccess = null, admin = false, onReject= null,confirmDialog = false, dialogMessage = '', message= 'Eliminación exitosa') {
      const executeDelete = async () => {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.delete(`${this.baseURL}/${endpoint}`, config);
      showSuccess(message);
      if (onSuccess) await onSuccess();
      return response.data;
    } catch (error) {
      showError(error);
      if (onReject) await onReject();
    }
  };

  if (confirmDialog) {
    return await this.dialog(dialogMessage, executeDelete);
  }

  return await executeDelete();
  }
}


