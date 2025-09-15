import express from 'express'
import CountriesService from './Countries.service.js'
import Country from '../../Shared/Models/country.js'
import BaseController from '../../Shared/Controllers/BaseController.js'
import CountryHelper from './helpers/CountryHelper.js'
import { Validator } from 'req-valid-express'
import getcountries from './helpers/getcountries.js'

export const countryServ = new CountriesService(
  Country,
  false,
  null,
  CountryHelper.countryDTO,
  'cca3')

const country = new BaseController(countryServ)

const countryRouter = express.Router()

countryRouter.get(
  '/',
  Validator.validateQuery(getcountries),
  country.getAll)

countryRouter.get(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  country.getById
)

export default countryRouter
