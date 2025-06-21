import BaseService from '../../shared/Services/BaseService.js'
import { Auth } from '../../shared/Auth/auth.js'
import bcrypt from 'bcrypt'
import eh from '../../Configs/errorHandlers.js'

export default class UserService extends BaseService{
  constructor (model, useImages = false, deleteImages = null, parserFunction = null, modelName = '', emailFunction=null){
    super(model, useImages, deleteImages, parserFunction, modelName)
    this.emailFunction= emailFunction
  }

  async #validateUser (data, isLogin){
    const userWhere = isLogin
      ?  { email: data.email, deleted: false }
      :  { _id: data.id, deleted: false }

    const userFound = await this.model.findOne(userWhere)
    if (!userFound){eh.throwError('User not found', 404)}
    const passwordMatch = await bcrypt.compare(data.password, userFound.password)
    if (!passwordMatch){eh.throwError('Invalid password', 400)}
    if (!userFound.enabled){eh.throwError('User bloqued', 400)}
    //if (!userFound.isVerify){eh.throwError('User account not verify', 400)}
    return userFound
  }
  async login (data){
    try {
      const verify = await this.#validateUser(data, true)
      return {
        message: 'Login successfully!',
        results: {
          user: this.parserFunction? this.parserFunction(verify): verify,
          token: Auth.generateToken(verify)
        }
      }
    } catch (error) {
      eh.processError(error,'Login error')
    }
  }
  async verifyPassword (data){
    try {
      await this.#validateUser(data, false)
      return {
        message: 'Password verified successfully!',
        results: null
      }
    } catch (error) {
      eh.processError(error,'Verify password error')
    }
  }
  async update (id, data) {
    const register = await this.model.findOne({ _id: id, deleted: false })
    if (!register) { eh.throwError(`${this.modelName} not found`, 404) }
    const protectProtocol = register.isRoot === true

    const updData = protectProtocol
      ? {
        ...data,
        email: register.email,
        nickname: register.nickname || register.email.split('@')[0],
        password: register.password,
        role: 9,
        enabled: true,
        isRoot: true,
        deleted: false
      }
      :
      data
    return await super.update(id, updData)
  }
  async delete (id) {
    const user = await this.model.findOne({ _id:id })
    if (!user) eh.throwError('User not found', 404)
    if (user.isRoot) eh.throwError('Forbidden: Cannot delete root user', 403)

    return await super.delete(id)
  }

  async hardDelete (id) {
    const user = await this.model.findById({ _id: id })
    if (!user) eh.throwError('User not found', 404)
    if (user.isRoot) eh.throwError('Forbidden: Cannot hard delete root user', 403)

    return await super.hardDelete(id)
  }
}
