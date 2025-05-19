import BaseEndpoints from './core/BaseEndpoint'




const countries = new BaseEndpoints('/api/v1', false)

export const getAllCountries = ()=> countries.get('/', )
export const getCountry = (id, params)=> countries.get(`/${id}`, params)
