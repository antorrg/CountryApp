import express from 'express'
import User from '../../Shared/Models/user.js'
import UserService from './user.service.js'
import UserController from './user.controller.js'
import UserHelper from './userHelper/UserHelper.js'
import { Validator } from 'req-valid-express'
import { Auth } from '../../Shared/Auth/auth.js'
import sch from './userHelper/validators/index.js'

//TODO model(DB_model), useImages(boolean), deleteImages(function), parserFunction(function), modelName(string), emailFunction(function)
export const userService = new UserService(User, false, null, UserHelper.userCleaner, 'user', null)
const controller = new UserController(userService)

const userRouter = express.Router()
userRouter.get(
  '/',
  Auth.verifyToken,
  Validator.validateQuery(UserHelper.typeQueries),
  controller.getAdmin
)

userRouter.get('/:id',
  Auth.verifyToken,
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  controller.getById
)

userRouter.post(
  '/create',
  Validator.validateBody(sch.create),
  Validator.validateRegex(UserHelper.regexEmail, 'email'),
  Validator.validateRegex(UserHelper.regexPassword, 'password'),
  UserHelper.userCreateDto,
  controller.create
)
userRouter.post(
  '/login',
  Validator.validateBody(sch.create),
  Validator.validateRegex(UserHelper.regexEmail, 'email'),
  Validator.validateRegex(UserHelper.regexPassword, 'password'),
  controller.login
)
userRouter.post(
  '/verify',
  Auth.verifyToken,
  Validator.validateBody(sch.verifyPass),
  Validator.validateRegex(UserHelper.regexPassword, 'password'),
  Validator.validateRegex(UserHelper.regexPassword, 'newPassword'),
  controller.verifyPassword
)
userRouter.put(
  '/profile/:id',
  Auth.verifyToken,
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  Validator.validateBody(sch.profile),
  UserHelper.protectPersonalAccount,
  controller.update
)
userRouter.put(
  '/upgrade/:id',
  Auth.verifyToken,
  Auth.checkRole([3,9]),
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  Validator.validateBody(sch.upgrade),
  UserHelper.userUpgradeDto,
  controller.update
)

userRouter.delete(
  '/:id',
  Auth.verifyToken,
  Auth.checkRole([3,9]),
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  controller.delete
)

export default userRouter
