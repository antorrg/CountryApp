import BaseService from './BaseService.js'
import Test from '../../../test/baseHelperTest/modelTest.js'
import * as info from './testHelpers/testHelp.js'
import { setId, getId } from '../../../test/baseHelperTest/testStore.js'
import mongoose from 'mongoose'
import * as fns from '../../../test/baseHelperTest/generalFunctions.js'
import { testSeeds } from './testHelpers/seeds.js'
import { resetDatabase } from '../../../test/jest.setup.js'

// model, useImages, deleteImages, parserFunction
const testImsSuccess = new BaseService(Test, true, fns.deletFunctionTrue, info.infoClean, 'Test')
const testImgFailed = new BaseService(Test, true, fns.deletFunctionFalse, info.infoClean, 'Test')
const testParsed = new BaseService(Test, false, null, info.infoClean, 'Test')

describe('Unit tests for the BaseService class: CRUD operations.', () => {
  afterAll(async ()=>{
    await resetDatabase()
  })
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
    beforeAll(async ()=>{
      await Test.insertMany(testSeeds)
    })
    it('"getAll" method: should return an array of services', async () => {
      const queryObject = { page: 1, limit: 10, filters: {}, sort:{} }
      const response = await testParsed.getAll(queryObject)
      expect(response.message).toBe('Elements found successfully!')
      expect(response.info).toEqual({ page: 1, limit: 10, totalPages: 2, count: 17, sort: {} })
      expect(response.results.length).toBe(10)
    })
    it('"getAll" method should return page 2 of results', async () => {
      const queryObject = { page: 2, limit: 10, filters: {}, sort: {} }
      const response = await testParsed.getAll(queryObject)
      expect(response.results.length).toBeLessThanOrEqual(10)
      expect(response.info.page).toBe(2)
    })
    it('"getAll" method should return sorted results (by title desc)', async () => {
      const queryObject = { page: 1, limit: 5, sort: { title: 'desc' } }
      const response = await testParsed.getAll(queryObject)
      const titles = response.results.map(r => r.title)
      const sortedTitles = [...titles].sort().reverse()
      expect(titles).toEqual(sortedTitles)
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
  describe('The "update" method - Handles removal of old images from storage.', () => {
    it('should update the document without removing any images', async () => {
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
    it('should update the document and remove the previous image', async () => {
      const id = getId()
      const newData = { picture: 'https://imagen.com.ar' }
      const response = await testImsSuccess.update(id, newData)
      expect(response.message).toBe('Test updated successfully!')
    })
    it('should throw an error if image deletion fails during update', async () => {
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
  describe('The "delete" method.', () => {
    it('should delete a document successfully (soft delete)', async () => {
      const id = getId()
      const response = await testImgFailed.delete(id)
      expect(response.message).toBe('Test deleted successfully')
    })
    it('should throw an error if image deletion fails during hard delete', async () => {
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
