import bcrypt from 'bcrypt'
import env from '../../../Configs/envConfig.js'
import eh from '../../../Configs/errorHandlers.js'
import role from './roleUtils.js'

export default class UserHelper{
  static userCleaner (userDoc){
    return {
      id: userDoc._id.toString(),
      email: userDoc.email,
      nickname: userDoc.nickname,
      name: userDoc.name || 'No created yet',
      surname:userDoc.surname || 'No created yet',
      country: userDoc.country || 'No created yet',
      picture: userDoc.picture,
      role: role.roleToString(userDoc.role),
      isVerify: userDoc.isVerify,
      enabled: userDoc.enabled,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt
    }
  }
  static async userCreateDto (req, res, next){
    try {
      let { email, password }= req.body
      const normalizedEmail = email.trim().toLowerCase()
      const nickname= normalizedEmail.split('@')[0]
      const picture = env.DefaultImg.trim()
      const hashedPassword = await bcrypt.hash(password.trim(), 12)
      req.body.data = {
        email: normalizedEmail,
        password: hashedPassword,
        nickname,
        picture
      }
      next()
    } catch (error){
      return next(eh.middError('Data in error', 400))
    }
  }
  static protectPersonalAccount (req, res, next){
    const { id } = req.params
    const newData = req.body
    const { userId, userRole } = req.userInfo
    if (id !== userId){return next(eh.middError('Only the owner can update their profile',400))}
    if (newData.email){return next(eh.middError('Forbidden action',403))}
    if (newData.role !== userRole){return next(eh.middError('Forbidden action', 403))}
    next()
  }
  static userUpgradeDto (req, res, next){
    const data= req.body
    const codeRole = role.roleToCode(data.role)
    if (codeRole === 9){return next(eh.middError('Forbidden action', 403))}
    req.body.data = {
      enabled,
      role: codeRole
    }
    next()
  }
  static typeCreate = [
    { name: 'email', type: 'string' },
    { name: 'password', type: 'string' }
  ]
  static typeProfile = [
    { name: 'email', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'username', type: 'string' },
    { name: 'country', type: 'string' },
    { name: 'picture', type: 'string' }
  ]
  static typeUpgrade = [
    { name: 'enable', type: 'boolean' },
    { name: 'role', type: 'string' }
  ]
  static typeVerifyPass = [
    { name: 'id', type: 'string' },
    { name: 'password', type: 'string' },
    {name:'newPassword', type: 'string'}
  ]
  static typePass = [
    { name: 'password', type: 'string' }
  ]
  static typeQueries = [
    { name: 'page', type: 'int', default: 1 },
    { name: 'limit', type: 'int', default: 5 },
    { name: 'name', type: 'string', default:'' },
    { name: 'sort', type: 'string', default: 'asc' }
  ]
  static regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  static regexPassword =/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
}

