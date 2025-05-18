// __tests__/userService.methods.test.js
import UserService from './user.service.js'
import bcrypt from 'bcrypt'
import Auth from '../../shared/Auth/auth'
import eh from '../../Configs/errorHandlers'

jest.mock('bcrypt')
jest.mock('../../shared/Auth/auth')
jest.mock('../../Configs/errorHandlers', () => ({
  throwError: jest.fn((msg, status) => { throw new Error(`${status}: ${msg}`) }),
  processError: jest.fn()
}))

describe('UserService methods', () => {
  let service, mockModel, superDelete, superHardDelete, superUpdate

  beforeEach(() => {
    mockModel = {
      findOne: jest.fn(),
      findById: jest.fn()
    }

    class TestService extends UserService {
      constructor () {
        super(mockModel, false, null, null, 'User')
      }

      async delete (id) {
        return await super.delete(id)
      }

      async hardDelete (id) {
        return await super.hardDelete(id)
      }

      async update (id, data) {
        return await super.update(id, data)
      }
    }

    service = new TestService()

    superDelete = jest.spyOn(Object.getPrototypeOf(UserService.prototype), 'delete')
    superDelete.mockResolvedValue({ message: 'soft deleted' })

    superHardDelete = jest.spyOn(Object.getPrototypeOf(UserService.prototype), 'hardDelete')
    superHardDelete.mockResolvedValue({ message: 'hard deleted' })

    superUpdate = jest.spyOn(Object.getPrototypeOf(UserService.prototype), 'update')
    superUpdate.mockResolvedValue({ message: 'updated' })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('login', () => {
    test('debe loguear correctamente si la validación es exitosa', async () => {
      const input = { email: 'test@example.com', password: 'pass' }
      const fakeUser = {
        _id: 'u1',
        email: 'test@example.com',
        password: 'hashed',
        enabled: true,
        isVerify: true
      }

      mockModel.findOne.mockResolvedValue(fakeUser)
      bcrypt.compare.mockResolvedValue(true)
      Auth.generateToken.mockReturnValue('FAKE.TOKEN')

      const result = await service.login(input)

      expect(result.message).toBe('Login successfully!')
      expect(result.results.token).toBe('FAKE.TOKEN')
    })

    test('debe lanzar error si el usuario no existe', async () => {
      mockModel.findOne.mockResolvedValue(null)

      await service.login({ email: 'x', password: 'x' })

      expect(eh.processError).toHaveBeenCalledWith(expect.any(Error), 'Login error')
    })

    test('debe lanzar error si la contraseña es incorrecta', async () => {
      mockModel.findOne.mockResolvedValue({
        password: 'hashed',
        enabled: true,
        isVerify: true
      })
      bcrypt.compare.mockResolvedValue(false)

      await service.login({ email: 'x', password: 'bad' })

      expect(eh.processError).toHaveBeenCalledWith(expect.any(Error), 'Login error')
    })

    test('debe lanzar error si el usuario está bloqueado o no verificado', async () => {
      mockModel.findOne.mockResolvedValue({
        password: 'hashed',
        enabled: false,
        isVerify: false
      })
      bcrypt.compare.mockResolvedValue(true)

      await service.login({ email: 'x', password: 'good' })

      expect(eh.processError).toHaveBeenCalledWith(expect.any(Error), 'Login error')
    })
  })

  describe('verifyPassword', () => {
    test('verifica contraseña exitosamente', async () => {
      mockModel.findOne.mockResolvedValue({
        password: 'hashed',
        enabled: true,
        isVerify: true
      })
      bcrypt.compare.mockResolvedValue(true)

      const result = await service.verifyPassword({ id: 'u1', password: 'pass' })

      expect(result.message).toBe('Password verified successfully!')
    })

    test('lanza error si contraseña inválida o usuario no verificado', async () => {
      mockModel.findOne.mockResolvedValue({
        password: 'hashed',
        enabled: false,
        isVerify: false
      })
      bcrypt.compare.mockResolvedValue(true)

      await service.verifyPassword({ id: 'x', password: '1234' })

      expect(eh.processError).toHaveBeenCalledWith(expect.any(Error), 'Verify password error')
    })
  })

  describe('update', () => {
    test('debe actualizar usuario no root con los datos recibidos', async () => {
      const id = 'u1'
      const newData = { name: 'John', role: 2 }

      mockModel.findOne.mockResolvedValue({ _id: id, deleted: false, isRoot: false })

      const result = await service.update(id, newData)

      expect(mockModel.findOne).toHaveBeenCalledWith({ _id: id, deleted: false })
      expect(superUpdate).toHaveBeenCalledWith(id, newData)
      expect(result).toEqual({ message: 'updated' })
    })

    test('debe proteger los campos de root durante la actualización', async () => {
      const id = 'root-id'
      const newData = { name: 'Hacker', email: 'bad@evil.com', role: 1 }

      const originalUser = {
        _id: id,
        deleted: false,
        isRoot: true,
        email: 'admin@site.com',
        password: 'encrypted',
        role: 9
      }

      mockModel.findOne.mockResolvedValue(originalUser)

      const result = await service.update(id, newData)

      expect(superUpdate).toHaveBeenCalledWith(id, {
        ...newData,
        email: 'admin@site.com',
        password: 'encrypted',
        role: 9,
        enabled: true,
        isRoot: true,
        deleted: false
      })
      expect(result).toEqual({ message: 'updated' })
    })

    test('debe lanzar error si el usuario no existe', async () => {
      mockModel.findOne.mockResolvedValue(null)

      await expect(service.update('not-found', {})).rejects.toThrow('404: User not found')
    })
  })
  describe('delete', () => {
    test('debe eliminar un usuario que no es root', async () => {
      const userId = 'abc123'
      mockModel.findOne.mockResolvedValue({ _id: userId, isRoot: false })

      const result = await service.delete(userId)

      expect(mockModel.findOne).toHaveBeenCalledWith({ _id: userId })
      expect(superDelete).toHaveBeenCalledWith(userId)
      expect(result).toEqual({ message: 'soft deleted' })
    })

    test('debe lanzar error al intentar eliminar un usuario root', async () => {
      const userId = 'root-id'
      mockModel.findOne.mockResolvedValue({ _id: userId, isRoot: true })

      await expect(service.delete(userId)).rejects.toThrow('403: Forbidden: Cannot delete root user')
    })

    test('debe lanzar error si el usuario no existe', async () => {
      mockModel.findOne.mockResolvedValue(null)

      await expect(service.delete('not-found')).rejects.toThrow('404: User not found')
    })
  })

  describe('hardDelete', () => {
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
