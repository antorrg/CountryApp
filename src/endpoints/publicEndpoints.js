import BaseEndpoints from './core/BaseEndpoint'

const baseUrl= import.meta.env.VITE_URL;

const countries = new BaseEndpoints(baseUrl, true)

export const getAllCountries = ()=> countries.get('/', )
export const getCountry = (id, params)=> countries.get(`/${id}`, params)
