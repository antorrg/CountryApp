import express from 'express'
import User from '../../shared/Models/user.js'
import UserService from './user.service.js'
import UserController from './user.controller.js'
import UserHelper from './userHelper/UserHelper.js'
import MiddlewareHandler from '../../shared/Middlewares/MiddlewareHandler.js'
import { Auth } from '../../shared/Auth/auth.js'
import sch from './userHelper/validators/index.js'

//TODO model(DB_model), useImages(boolean), deleteImages(function), parserFunction(function), modelName(string), emailFunction(function)
export const userService = new UserService(User, false, null, UserHelper.userCleaner, 'user', null)
const controller = new UserController(userService)

const userRouter = express.Router()
userRouter.get(
  '/',
  Auth.verifyToken,
  MiddlewareHandler.validateQuery(UserHelper.typeQueries),
  controller.getAdmin
)

userRouter.get('/:id',
  Auth.verifyToken,
  MiddlewareHandler.middObjectId('id'),
  controller.getById
)

userRouter.post(
  '/create',
  MiddlewareHandler.validateFields(sch.create),
  MiddlewareHandler.validateRegex(UserHelper.regexEmail, 'email'),
  MiddlewareHandler.validateRegex(UserHelper.regexPassword, 'password'),
  UserHelper.userCreateDto,
  controller.create
)
userRouter.post(
  '/login',
  MiddlewareHandler.validateFields(sch.create),
  MiddlewareHandler.validateRegex(UserHelper.regexEmail, 'email'),
  MiddlewareHandler.validateRegex(UserHelper.regexPassword, 'password'),
  controller.login
)
userRouter.post(
  '/verify',
  Auth.verifyToken,
  MiddlewareHandler.validateFields(sch.verifyPass),
  MiddlewareHandler.validateRegex(UserHelper.regexPassword, 'password'),
  MiddlewareHandler.validateRegex(UserHelper.regexPassword, 'newPassword'),
  controller.verifyPassword
)
userRouter.put(
  '/profile/:id',
  Auth.verifyToken,
  MiddlewareHandler.middObjectId('id'),
  MiddlewareHandler.validateFields(sch.profile),
  UserHelper.protectPersonalAccount,
  controller.update
)
userRouter.put(
  '/upgrade/:id',
  Auth.verifyToken,
  Auth.checkRole([3,9]),
  MiddlewareHandler.middObjectId('id'),
  MiddlewareHandler.validateFields(sch.upgrade),
  UserHelper.userUpgradeDto,
  controller.update
)

userRouter.delete(
  '/:id',
  Auth.verifyToken,
  Auth.checkRole([3,9]),
  MiddlewareHandler.middObjectId('id'),
  controller.delete
)

export default userRouter
