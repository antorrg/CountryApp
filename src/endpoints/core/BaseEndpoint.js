import axios from 'axios'
import {showSuccess, showError} from "./toastify"
import showConfirmationDialog from './sweetalert'

export default class BaseEndpoints {
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

  async dialog(dialog = '', asyncFunction = null) {
    if (!dialog.trim()) {
      alert('Missing dialog');
      return;
    }
    const confirmed = await showConfirmationDialog(`${dialog}`);
    if (confirmed) {
      return await asyncFunction();
    }
  }

  async sender(axiosFunction, auxFunction = null, rejectFunction = null, message = 'Operación exitosa') {
    try {
      const response = await axiosFunction();
      showSuccess(message);
      if (auxFunction) await auxFunction();
      return response;
    } catch (error) {
      showError(error);
      if (rejectFunction) await rejectFunction();
    }
  }

  async sendPost(endpoint, data) {
    const config = this.setAuthHeader();
    const response = await axios.post(`${this.baseURL}/${endpoint}`, data, config);
    return response;
  }

  async sendPut(endpoint, data) {
    const config = this.setAuthHeader();
    const response = await axios.put(`${this.baseURL}/${endpoint}`, data, config);
    return response;
  }

  async sendDelete(endpoint) {
    const config = this.setAuthHeader();
    const response = await axios.delete(`${this.baseURL}/${endpoint}`, config);
    return response;
  }

  async get(endpoint, params = {}, auxFunction = null) {
    try {
      const config = this.setAuthHeader();
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        ...config,
        params,
      });
      if (auxFunction) await auxFunction();
      return response.data;
    } catch (error) {
      showError(error);
    }
  }

  async post(endpoint, data = {}, auxFunction = null, rejectFunction = null, message = 'Operación exitosa', confirmDialog = false, dialogMessage = '') {
    const executePost = () => this.sender(() => this.sendPost(endpoint, data), auxFunction, rejectFunction, message);
    if (confirmDialog) {
      return await this.dialog(dialogMessage, executePost);
    }
    return await executePost();
  }

  async put(endpoint, data = {}, auxFunction = null, rejectFunction = null, message = 'Actualización exitosa', confirmDialog = false, dialogMessage = '') {
    const executePut = () => this.sender(() => this.sendPut(endpoint, data), auxFunction, rejectFunction, message);
    if (confirmDialog) {
      return await this.dialog(dialogMessage, executePut);
    }
    return await executePut();
  }

  async delete(endpoint, auxFunction = null, rejectFunction = null, message = 'Eliminación exitosa', confirmDialog = false, dialogMessage = '') {
    const executeDelete = () => this.sender(() => this.sendDelete(endpoint), auxFunction, rejectFunction, message);
    if (confirmDialog) {
      return await this.dialog(dialogMessage, executeDelete);
    }
    return await executeDelete();
  }
}

