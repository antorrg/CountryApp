import env from './envConfig.js'
import mongoose from 'mongoose'
import Country from '../shared/Models/country.js'

describe('Iniciando tests, probando variables de entorno del archivo "envConfig.js" y existencia de tablas en DB.', () => {
  afterAll(() => {
    console.log('Finalizando todas las pruebas...')
  })

  it('Deberia retornar el estado y la variable de base de datos correcta', () => {
    const formatEnvInfo = `Servidor corriendo en: ${env.Status}\n` +
                   `Base de datos de testing: ${env.UriDb}`
    expect(formatEnvInfo).toBe('Servidor corriendo en: test\n' +
        'Base de datos de testing: mongodb://127.0.0.1:27017/testing')
  })
  it('Debería hacer una consulta básica en cada tabla sin errores', async () => {
    const models = [
      Country
    ]
    for (const model of models) {
      const records = await model.find()
      expect(Array.isArray(records)).toBe(true)
      expect(records.length).toBe(0)
    }
  })
})
