import express from 'express'
import CountriesService from './Countries.service.js'
import Country from '../../shared/Models/country.js'
import GenericController from '../../shared/Controllers/GenericController.js'
import CountryHelper from './helpers/CountryHelper.js'


export const countryServ = new CountriesService(
    Country, 
    false, 
    null, 
    CountryHelper.countryDTO, 
    'name.common')

const country = new GenericController(countryServ)

const countryRouter = express.Router()

countryRouter.get('/', country.getAll)

export default countryRouter
