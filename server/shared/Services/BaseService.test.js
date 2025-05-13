import BaseService from './BaseService.js'
import Test from '../../../test/baseHelperTest/modelTest.js'
import * as info from './testHelpers/testHelp.js'
import {setId, getId} from '../../../test/baseHelperTest/testStore.js'
import mongoose from 'mongoose'
//import * as fns from '../../../test/baseHelperTest/generalFunctions.js'

// model, useImages, deleteImages, parserFunction
const testing = new BaseService(Test, false, null, null, 'Test')
const testImages = new BaseService(Test, false, null, null, 'Test')
const testParsed = new BaseService(Test, false, null, info.infoClean, 'Test')

describe('Unit tests for the BaseService class: CRUD operations.', () => {
  
  describe('The "create" method for creating a service', () => {
    it('should create an item with the correct parameters', async () => {
      const element = {title: "page", count: 5, picture: 'https//pepe.com'} 
      const response = await testParsed.create(element, 'title')
      setId(response.results.id)
      expect(response.message).toBe('title page created successfully')
      //expect(response.results instanceof mongoose.Model).toBe(true);
     expect(response.results).toEqual(info.resultParsedCreate)
    })
    it('should throw an error when attempting to create the same item twice (error handling)', async () => {
      const element = {title: "page", count: 5, picture: 'https//pepe.com',}
      try {
        await testParsed.create(element, 'title')
        throw new Error('❌ Expected a duplication error, but none was thrown');
      } catch (error) {
        expect(error.status).toBe(400)
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('This title already exists')
      }
    })
  })
  describe('"GET" methods. Return one or multiple services..', () => {
    it('"getAll" method: should return an array of services', async () => {
      const queryObject = { page : 1, limit : 10, filters : {} }
      const response = await testParsed.getAll(queryObject)
      console.log('A ver el get', response)
      expect(response.results).toEqual([info.resultParsedCreate])
    })
  })
  describe('Metodo "update". Eliminacion de imagenes viejas del storage.', () => {
    it('deberia actualizar los elementos y no eliminar imagenes', async () => {
      const id = getId()
      const newData = info.newData
      const response = await testParsed.update(id, newData)
      expect(response.message).toBe('Test updated successfully!')
      //expect(response.data).toMatchObject(info.responseNewData)
    })
    xit('deberia actualizar los elementos y gestionar eliminacion de imagenes', async () => {
      const id = 1
      const newData = { picture: 'https://imagen.com.ar' }
      const response = await servParse.update(id, newData)
      expect(response.message).toBe('Landing updated successfully')
      expect(response.data).toMatchObject(info.responseDataImg)
    })
    xit('deberia arrojar un error si falla la eliminacion de imagenes', async () => {
      const id = 1
      const newData = info.responseData
      try {
        await serv.update(id, newData)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(500)
        expect(error.message).toBe('Error processing ImageUrl: https://imagen.com.ar')
      }
    })
  })
  xdescribe('Metodo "delete".', () => {
    it('deberia borrar un elemento', async () => {
      const element = info.createSecondData
      await serv.create(element, 'name')
      const id = 1
      const response = await servParse.delete(id)
      expect(response.message).toBe('Landing deleted successfully')
    })
    it('deberia arrojar un error si falla la eliminacion de imagenes', async () => {
      const id = 2
      try {
        await serv.delete(id)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(500)
        expect(error.message).toBe('Error processing ImageUrl: https://picture.com.ar')
      }
    })
  })
})
