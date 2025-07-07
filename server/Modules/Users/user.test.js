import UserService from './user.service.js'
import User from '../../shared/Models/user.js'
import bcrypt from 'bcrypt'
import * as fns from '../../../test/baseHelperTest/generalFunctions.js'
import { setId, getId } from '../../../test/baseHelperTest/testStore.js'
import UserHelper from './userHelper/UserHelper.js'
import Auth from '../../shared/Auth/auth.js'
import eh from '../../Configs/errorHandlers.js'

let service = new UserService(User, true, fns.deletFunctionTrue, UserHelper.userCleaner, 'User', null)

describe('UserService methods', () => {

  describe('login', () => {
    test('debe loguear correctamente si la validación es exitosa', async () => {
      const hashedPass = await bcrypt.hash('pass', 12)
      const newUser = { email: 'test@example.com', password: hashedPass, nickname: 'test', picture: 'imagen', isRoot:false, isVerify: true }
      const userCreated = await service.create(newUser, 'email')
      setId(userCreated.results.id)
      const input = { email: 'test@example.com', password: 'pass' }
      const fakeUser = {
        id: expect.any(String),
        email: 'test@example.com',
        enabled: true,
        isVerify: true
      }

      const result = await service.login(input)
      expect(result.message).toBe('Login successfully!')
      expect(result.results.token).toEqual(expect.any(String))
      expect(result.results.user).toMatchObject(fakeUser)
    })

    test('debe lanzar error si el usuario no existe', async () => {
      try {
        await service.login({ email: 'x', password: 'x' })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(404)
        expect(error.message).toBe('Login error: User not found')
      }
    })

    test('debe lanzar error si la contraseña es incorrecta', async () => {
      try {
        await service.login({ email: 'test@example.com', password: 'bad' })
        throw new Error('Se esperaba un error de validacion, pero nada ocurrió')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(400)
        expect(error.message).toBe('Login error: Invalid password')
      }
    })
    test('debe lanzar error si el usuario está bloqueado o no verificado', async () => {
      try {
        await service.update(getId(), { enabled: false })
        await service.login({ email: 'test@example.com', password: 'pass' })
        throw new Error('Se esperaba un error de validacion, pero nada ocurrió')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(400)
        expect(error.message).toBe('Login error: User bloqued')
      }
    })
  })
  describe('verifyPassword', () => {
    it('verifica contraseña exitosamente', async () => {
      await service.update(getId(), { enabled: true })
      const result = await service.verifyPassword({ id: getId(), password: 'pass' })
      expect(result.message).toBe('Password verified successfully!')
    })

    it('lanza error si contraseña inválida o usuario bloqueado', async () => {
      try {
        await service.update(getId(), { enabled: false })
        await service.verifyPassword({ id: getId(), password: '1234' })
        throw new Error('Se esperaba un error de validacion, pero nada ocurrió')
      } catch (error) {
        console.log('error', error)
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(400)
        expect(error.message).toBe('Verify password error: Invalid password')
      }
    })
  })

  describe('update', () => {
    it('debe actualizar usuario no root con los datos recibidos', async () => {
      const id = getId()
      const newData = { name: 'John', role: 2 , isRoot: true }

      const result = await service.update(id, newData)
      console.log('update',result)

      expect(result.message).toBe('User updated successfully!')
    })

    it('debe proteger los campos de root durante la actualización', async () => {
      const id = getId()
      const newData = { name: 'Hacker', email: 'bad@evil.com', role: 1 }

      const originalUser = {
        country: 'No created yet',
        createdAt: expect.any(Date),
        email: 'test@example.com',
        enabled: true,
        id: expect.any(String),
        isVerify: true,
        name: 'Hacker',
        nickname: 'test',
        picture: 'imagen',
        role: 'superadmin',
        surname: 'No created yet',
        updatedAt:expect.any(Date)
      }

      const result = await service.update(id, newData)
      expect(result.message).toBe('User updated successfully!')
      const response = await service.getById(id)
      expect(response.results).toEqual(originalUser)

    })
  })
  xdescribe('delete', () => {
    it('debe eliminar un usuario que no es root', async () => {
      const userId = getId()
      const result = await service.delete(userId)
      expect(result.message).toBe('User deleted successfully')
    })

    it('debe lanzar error al intentar eliminar un usuario root', async () => {
      const userId = 'root-id'
      mockModel.findOne.mockResolvedValue({ _id: userId, isRoot: true })

      await expect(service.delete(userId)).rejects.toThrow('403: Forbidden: Cannot delete root user')
    })

    it('debe lanzar error si el usuario no existe', async () => {
      mockModel.findOne.mockResolvedValue(null)

      await expect(service.delete('not-found')).rejects.toThrow('404: User not found')
    })
  })

  xdescribe('hardDelete', () => {
    test('debe hard delete si no es root', async () => {
      const userId = 'abc123'
      mockModel.findById.mockResolvedValue({ _id: userId, isRoot: false })

      const result = await service.hardDelete(userId)

      expect(mockModel.findById).toHaveBeenCalledWith({ _id: userId })
      expect(superHardDelete).toHaveBeenCalledWith(userId)
      expect(result).toEqual({ message: 'hard deleted' })
    })

    test('debe lanzar error si es root', async () => {
      mockModel.findById.mockResolvedValue({ isRoot: true })

      await expect(service.hardDelete('root')).rejects.toThrow('403: Forbidden: Cannot hard delete root user')
    })

    test('debe lanzar error si no existe el usuario', async () => {
      mockModel.findById.mockResolvedValue(null)

      await expect(service.hardDelete('not-found')).rejects.toThrow('404: User not found')
    })
  })
})
