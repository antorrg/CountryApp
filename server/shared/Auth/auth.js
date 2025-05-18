import pkg from 'jsonwebtoken'
import crypto from 'crypto'
import eh from '../../Configs/errorHandlers.js'
import env from '../../Configs/envConfig.js'

export default class Auth {

  static generateToken (user){
    const intData = disguiseRole(user.role, 5)
    const expiresIn = Math.ceil(env.ExpiresIn * 60 * 60) // Obtener el tiempo de expiración en segundos
    const token = pkg.sign({ userId: user.id, email:user.email, internalData:intData }, env.Secret, { expiresIn })
    return token
  }

  static async verifyToken (req, res, next) {
    try {
      let token = req.headers['x-access-token'] || req.headers.authorization
      if (!token) {
        return next(eh.middError('Unauthorized access. Token not provided.', 401))
      }
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
      }
      if (!token) {
        return next(eh.middError('Missing token!', 401))
      }

      const decoded = pkg.verify(token, env.Secret)

      req.user = decoded
      const userId = decoded.userId
      const userRole = recoveryRole(decoded.internalData, 5)
      req.userInfo = { userId, userRole }

      next()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return next(eh.middError('Expired token', 401))
      }
      return next(eh.middError('Invalid token', 401))
    }
  }

  static checkRole (allowedRoles){
    return (req, res, next) => {
      const { userRole } = req.userInfo
      if (allowedRoles.includes(userRole)) {
        next()
      } else {
        return next(eh.middError('Access forbidden!', 403))
      }
    }
  }
  static generateEmailVerificationToken (userId) {
    return pkg.sign(
      { userId, type: 'emailVerification' },
      env.Secret,
      { expiresIn: '1h' }
    )
  }
  static async verifyEmailToken (req, res, next) {
    const token = req.query.token
    let errorResponse = ''
    if (!token) return next(eh.middError('Verification token missing.', 400))
    try {
      const decoded = pkg.verify(token, env.Secret)
      if (decoded.type !== 'emailVerification') {
        errorResponse = 'Invalid token type'
        return middError('Invalid token type',400)
      }
      const userId = decoded.userId

      // // Actualizar el usuario para marcar como verificado
      // const user = await User.findById(userId)
      // if (!user) return res.status(404).send('User not found.')
      // if (user.isVerify) return res.send('User already verified.')

      // user.isVerify = true
      // await user.save()

      //res.send('Email verified successfully!')

    } catch (error) {
      return res.status(400).send('Invalid or expired token.')
    }
  }

}
//Estas funciones no se exportan porque intervienen en la confeccion de jsonwebtoken
function disguiseRole (role, position){
  //Generar cadena aleatoria de 20 caracteres
  const generateSecret = () => {
    return crypto.randomBytes(10).toString('hex')}

  const str = generateSecret()
  if (position < 0 || position >= str.length) {
    throw new Error('Posición fuera de los límites de la cadena')}
  // Convertir el número a string
  const replacementStr = role.toString()
  // Crear la nueva cadena con el reemplazo
  return str.slice(0, position) + replacementStr + str.slice(position + 1)
}

function recoveryRole (str, position){
  if (position < 0 || position >= str.length) {
    throw new Error('Posición fuera de los límites de la cadena')}
  // Recuperar el carácter en la posición especificada
  const recover = str.charAt(position)
  return parseInt(recover)
}

//En recoveryRole str es el dato entrante (string)

//Este es un modelo de como recibe el parámetro checkRole:
//todo   app.get('/ruta-protegida', checkRole([3]),
