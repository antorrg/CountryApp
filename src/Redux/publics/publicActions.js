import {
    getAllCountries,
    getCountry,
    getExperiences,
    getExperienceById
} from '../../endpoints/publicEndpoints'

export const PUBLIC_ALL_COUNTRIES = 'PUBLIC_ALL_COUNTRIES';
export const PUBLIC_COUNTRY_BY_ID = 'PUBLIC_COUNTRY_BY_ID'
export const EXPERIENCES = 'EXPERIENCES'
export const EXPERIENCE_BY_ID = 'EXPERIENCE_BY_ID'
export const PUBLIC_CLEAN_DETAIL = 'PUBLIC_CLEAN_DETAIL'


//Public endpoints:
export const getCountries = ({ page = 1, limit = 16, name = '', sort = 'asc', region='' } = {})=> async(dispatch)=>{
    const query = {page, limit, name, sort, region}
    const response = await getAllCountries(query)
    return dispatch({
        type: PUBLIC_ALL_COUNTRIES,
        payload: response
    })
}

export const getCountryById = (countryId) => async(dispatch)=>{
    const response = await getCountry(countryId)
    return dispatch({
        type: PUBLIC_COUNTRY_BY_ID,
        payload: response
    })
}
export const getExperiencesByCountryId = (countryId) => async(dispatch) => {
    const response = await getExperiences(countryId)
    console.log(response)
    return dispatch({
        type: EXPERIENCES,
        payload: response
    })
}
export const getExperiencesById = (expId) => async(dispatch) => {
    console.log('estoy en actions:',expId)
    const response = await getExperienceById(expId)
    return dispatch({
        type: EXPERIENCE_BY_ID,
        payload: response
    })
}
export const publicCleanDetail = (dispatch) =>{
    return dispatch({
        type: PUBLIC_CLEAN_DETAIL,
        payload: []
    })
}
