import BaseEndpoints from './core/BaseEndpoint'




const countries = new BaseEndpoints('/api/v1', false)

export const getAllCountries = (params)=> countries.get('/', params)
export const getCountry = (id, params)=> countries.get(`/${id}`, params)
export const getExperiences = (id, params)=> countries.get(`/countries/${id}/experiences`)
