import BaseEndpoints from './core/BaseEndpoint'




const countries = new BaseEndpoints('/api/v1', false)

export const getAllCountries = (params)=> countries.get('/', params)
export const getCountry = (id, params)=> countries.get(`/${id}`, params)
export const getExperiences = (countryId, params)=> countries.get(`/experiences/${countryId}/experiences`)

const experiences = new BaseEndpoints('/api/v1', false)

export const getExperienceById = (id) => experiences.get(`/experiences/details/${id}`)
