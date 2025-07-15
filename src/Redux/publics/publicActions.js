import {
    getAllCountries,
    getCountry
} from '../../endpoints/publicEndpoints'

export const PUBLIC_ALL_COUNTRIES = 'PUBLIC_ALL_COUNTRIES';
export const PUBLIC_COUNTRY_BY_ID = 'PUBLIC_COUNTRY_BY_ID'
export const EXPERIENCES = 'EXPERIENCES'


//Public endpoints:
export const getCountries = ({ page = 1, limit = 16, name = '', sort = 'asc', region='' } = {})=> async(dispatch)=>{
    const query = {page, limit, name, sort, region}
    const response = await getAllCountries(query)
    return dispatch({
        type: PUBLIC_ALL_COUNTRIES,
        payload: response
    })
}

export const getCountryById = (id) => async(dispatch)=>{
    const response = await getCountry(id)
    return dispatch({
        type: PUBLIC_COUNTRY_BY_ID,
        payload: response
    })
}

