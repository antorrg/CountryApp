import express from 'express'
import CountriesService from './Countries.service.js'
import Country from '../../shared/Models/country.js'
import BaseController from '../../shared/Controllers/BaseController.js'
import CountryHelper from './helpers/CountryHelper.js'
import MiddlewareHandler from '../../shared/Middlewares/MiddlewareHandler.js'

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
  country.getAll)

countryRouter.get(
  '/:id',
  MiddlewareHandler.middObjectId('id'),
  country.getById
)

export default countryRouter
