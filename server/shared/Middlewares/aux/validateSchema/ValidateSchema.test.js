import session from 'supertest'
import serverTest from './helperTest/serverTest.js'
const agent = session(serverTest)

describe('Clase "ValidateSchema". Middleware clase estatica. Validacion y tipado de datos', () => {
  describe('Metodo "validate". Validacion y tipado datos en body (POST y PUT) Objeto simple', () => {
    it('deberia validar, tipar los parametros y permitir el paso si estos fueran correctos.', async () => {
      const data = {
        name: 'name',
        active: 'true',
        metadata: 'metadata',
    }

      const response = await agent
        .post('/test/body/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body.message).toBe('Passed middleware')
      expect(response.body.data).toEqual({
         name: 'name',
         active: true,
        metadata: 'metadata',
        price: 2.0
      })
    })
    it('deberia validar, tipar y arrojar un error si faltara algun parametro.', async () => {
      const data = { 
        active: 'true',
        metadata: 'metadata',
       price: 2.0}
      const response = await agent
        .post('/test/body/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body).toBe('Missing field: name at name')
    })
    it('deberia validar, tipar y arrojar un error si no fuera posible tipar un parametro.', async () => {
      const data = {
        name:'name',
       active: 'true',
        metadata: 'metadata',
       price: 'true'
      }
      const response = await agent
        .post('/test/body/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body).toBe('Invalid float value')
    })
    it('deberia validar, tipar los parametros y permitir el paso quitando todo parametro no declarado.', async () => {
     const data = {
        name: 'name',
        active: 'true',
        metadata: 'metadata',
        enable:true,
        price: 2.0
    }
      
      const response = await agent
        .post('/test/body/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body.message).toBe('Passed middleware')
      expect(response.body.data).toEqual({
         name: 'name',
         active: true,
         metadata: 'metadata',
         price: 2.0
      })
    })
  })
  describe('Metodo "validate". Validacion y tipado datos en body (POST y PUT) Objeto anidado', () => {
    it('deberia validar, tipar los parametros y permitir el paso si estos fueran correctos.', async () => {
      const data = {
        name: 'name',
        active: 'true',
        profile: {
            age: '25',
            rating: 3.25
        },
        tags:['publico', 'privado'],
        metadata: 'metadata',
    }

      const response = await agent
        .post('/test/body/extra/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body.message).toBe('Passed middleware')
      expect(response.body.data).toEqual({
      name: 'name',
        active: true,
        profile: {
            age: 25,
            rating: 3.25
        },
        tags:['publico', 'privado'],
        metadata: 'metadata',
      })
    })
    it('deberia validar, tipar y arrojar un error si faltara algun parametro.', async () => {
      const data = { 
        active: 'true',
        profile: {
            age: 25,
            rating: 3.25
        },
        tags:['publico', 'privado'],
        metadata: 'metadata',
    }
      const response = await agent
        .post('/test/body/extra/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body).toBe('Missing field: name at name')
    })
    it('deberia validar, tipar y arrojar un error si no fuera posible tipar un parametro.', async () => {
      const data = {
      name: 'name',
        active: 'true',
        profile: {
            age: 25,
            rating: 'cooole'
        },
        tags:['publico', 'privado'],
        metadata: 'metadata',
      }
      const response = await agent
        .post('/test/body/extra/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body).toBe('Invalid float value')
    })
    it('deberia validar, tipar los parametros y permitir el paso quitando todo parametro no declarado.', async () =>{     const data = {
        name: 'name',
        active: 'true',
        profile: {
            age: '25',
            rating: 3.25
        },
        tags:['publico', 'privado'],
        metadata: 'metadata',
        enable: true,
    }
      const response = await agent
        .post('/test/body/extra/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body.message).toBe('Passed middleware')
      expect(response.body.data).toEqual({
      name: 'name',
        active: true,
        profile: {
            age: 25,
            rating: 3.25
        },
        tags:['publico', 'privado'],
        metadata: 'metadata',
      })
    })
  })
  describe('Metodo "validate". Validacion y tipado datos en body (POST y PUT) Objeto doblemente anidado', () => {
    it('deberia validar, tipar los parametros y permitir el paso si estos fueran correctos.', async () => {
      const data = {
        name: 'name',
        active: 'true',
        profile: [{
            age: '25',
            rating: 3.25
        },{
            age: '33',
            rating: 4.0
        }],
        tags:['publico', 'privado'],
        metadata: 'metadata',
    }

      const response = await agent
        .post('/test/body/three/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body.message).toBe('Passed middleware')
      expect(response.body.data).toEqual({
           name: 'name',
        active: true,
        profile: [{
            age: 25,
            rating: 3.25
        },{
            age: 33,
            rating: 4.0
        }],
        tags:['publico', 'privado'],
        metadata: 'metadata',
      })
    })
    it('deberia validar, tipar y arrojar un error si faltara algun parametro.', async () => {
      const data = { 
        active: 'true',
        metadata: 'metadata',
       price: 2.0}
      const response = await agent
        .post('/test/body/three/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body).toBe('Missing field: name at name')
    })
    it('deberia validar, tipar y arrojar un error si no fuera posible tipar un parametro.', async () => {
         const data = {
        name: 'name',
        active: 'true',
        profile: [{
            age: '25',
            rating: 3.25
        },{
            age: 'psps99dl',
            rating: 4.0
        }],
        tags:['publico', 'privado'],
        metadata: 'metadata',
    }
      const response = await agent
        .post('/test/body/three/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body).toBe('Invalid integer value')
    })
    it('deberia validar, tipar los parametros y permitir el paso quitando todo parametro no declarado.', async () => {
     const data = {
        name: 'name',
        active: 'true',
        profile: [{
            age: '25',
            rating: 3.25
        },{
            age: '33',
            rating: 4.0
        }],
        tags:['publico', 'privado'],
        metadata: 'metadata',
        enable: true,
        deletedAt: null
    }
      
      const response = await agent
        .post('/test/body/three/create')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body.message).toBe('Passed middleware')
      expect(response.body.data).toEqual({
        name: 'name',
        active: true,
        profile: [{
            age: 25,
            rating: 3.25
        },{
            age: 33,
            rating: 4.0
        }],
        tags:['publico', 'privado'],
        metadata: 'metadata',
      })
    })
  })
})