import BaseService from './BaseService.js'
import Test from '../../../test/baseHelperTest/modelTest.js'
import * as info from './testHelpers/testHelp.js'
import { setId, getId } from '../../../test/baseHelperTest/testStore.js'
import mongoose from 'mongoose'
import { finished } from 'supertest/lib/test.js'
import * as fns from '../../../test/baseHelperTest/generalFunctions.js'

// model, useImages, deleteImages, parserFunction
const testImsSuccess = new BaseService(Test, true, fns.deletFunctionTrue, info.infoClean, 'Test')
const testImgFailed = new BaseService(Test, true, fns.deletFunctionFalse, info.infoClean, 'Test')
const testParsed = new BaseService(Test, false, null, info.infoClean, 'Test')

describe('Unit tests for the BaseService class: CRUD operations.', () => {
  describe('The "create" method for creating a service', () => {
    it('should create an item with the correct parameters', async () => {
      const element = { title: 'page', count: 5, picture: 'https//pepe.com' }
      const response = await testParsed.create(element, 'title')
      setId(response.results.id)
      expect(response.message).toBe('title page created successfully')
      // expect(response.results instanceof mongoose.Model).toBe(true);
      expect(response.results).toEqual(info.resultParsedCreate)
    })
    it('should throw an error when attempting to create the same item twice (error handling)', async () => {
      const element = { title: 'page', count: 5, picture: 'https//pepe.com' }
      try {
        await testParsed.create(element, 'title')
        throw new Error('❌ Expected a duplication error, but none was thrown')
      } catch (error) {
        expect(error.status).toBe(400)
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('Error created: This title already exists')
      }
    })
  })
  describe('"GET" methods. Return one or multiple services..', () => {
    it('"getAll" method: should return an array of services', async () => {
      const queryObject = { page: 1, limit: 10, filters: {}, sort:{} }
      const response = await testParsed.getAll(queryObject)
      expect(response.message).toBe('Elements found successfully!')
      expect(response.info).toEqual({ page: 1, limit: 10, totalPages: 1, count: 1, sort: {}})
      expect(response.results).toEqual([info.resultParsedCreate])
    })
    it('"getById" method: should return an service', async () => {
      const id = getId()
      const response = await testParsed.getById(id)
      expect(response.results).toEqual(info.resultParsedCreate)
    })
    it('"getById" should throw an error if service not exists', async () => {
      try {
        const invalidId = new mongoose.Types.ObjectId()
        await testParsed.getById(invalidId)
        throw new Error('❌ Expected a "Not found" error, but none was thrown')
      } catch (error) {
        expect(error.status).toBe(404)
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('Not found')
      }
    })
  })
  describe('Metodo "update". Eliminacion de imagenes viejas del storage.', () => {
    it('deberia actualizar los elementos y no eliminar imagenes', async () => {
      const id = getId()
      const newData = info.newData
      const response = await testParsed.update(id, newData)
      expect(response.message).toBe('Test updated successfully!')
      expect(response.results).toEqual({
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1
      })
    })
    it('deberia actualizar los elementos y gestionar eliminacion de imagenes', async () => {
      const id = getId()
      const newData = { picture: 'https://imagen.com.ar' }
      const response = await testImsSuccess.update(id, newData)
      expect(response.message).toBe('Test updated successfully!')
    })
    it('deberia arrojar un error si falla la eliminacion de imagenes', async () => {
      const id = getId()
      const newData = { picture: 'https://imagen44.com.ar' }
      try {
        const resp = await testImgFailed.update(id, newData)
        console.log('a ver si entro: ', resp)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(500)
        expect(error.message).toBe('Error updating: Error processing ImageUrl: https://imagen.com.ar')
      }
    })
  })
  describe('Metodo "delete".', () => {
    it('deberia borrar un elemento', async () => {
      const id = getId()
      const response = await testImgFailed.delete(id)
      expect(response.message).toBe('Test deleted successfully')
    })
    it('deberia arrojar un error si falla la eliminacion de imagenes', async () => {
      const id = getId()
      try {
        await testImgFailed.hardDelete(id)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(500)
        expect(error.message).toBe('Error deleting: Error processing ImageUrl: https://imagen44.com.ar')
      }
    })
  })
})
