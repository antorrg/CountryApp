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
}

