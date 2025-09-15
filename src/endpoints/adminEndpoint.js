import BaseEndpoints from './core/BaseEndpoint'

const login = new BaseEndpoints('/api/v1/user', false)
const users = new BaseEndpoints('/api/v1/user', true)

export const getAllCountries = (params)=> countries.get('/', params)
export const getCountry = (id, params)=> countries.get(`/${id}`, params)
export const getExperiences = (id, params)=> countries.get(`/countries/${id}/experiences`)