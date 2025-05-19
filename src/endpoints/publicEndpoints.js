import BaseEndpoints from './core/BaseEndpoint'

const baseUrl= import.meta.env.VITE_URL;

const countries = new BaseEndpoints(baseUrl, true)
export default {
    getAllCountries :()=> countries.get('/', ),
    getCountry: (id)=> countries.get(`/${id}`)
}