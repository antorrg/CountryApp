import express from 'express'
import User from '../../shared/Models/user.js'
import UserService from './user.service.js'
import UserController from './user.controller.js'
import UserHelper from './userHelper/UserHelper.js'
import MiddlewareHandler from '../../shared/Middlewares/MiddlewareHandler.js'
import * as dt from './userHelper/user.help.js'
import Auth from '../../shared/Auth/auth.js'

//TODO model(DB_model), useImages(boolean), deleteImages(function), parserFunction(function), modelName(string), emailFunction(function)
export const userService = new UserService(User, false, null, UserHelper.userCleaner, 'user', null)
const controller = new UserController(userService)

const userRouter = express.Router()

userRouter.post(
  '/create',
  MiddlewareHandler.validateFields(dt.userCreate),
  MiddlewareHandler.validateRegex(dt.regexEmail, 'email'),
  MiddlewareHandler.validateRegex(dt.regexPassword, 'password'),
  UserHelper.userCreateDto,
  controller.create
)
userRouter.post(
  '/login',
  MiddlewareHandler.validateFields(dt.userCreate),
  MiddlewareHandler.validateRegex(dt.regexEmail, 'email'),
  MiddlewareHandler.validateRegex(dt.regexPassword, 'password'),
  controller.login
)
userRouter.post(
  '/verify',
  Auth.verifyToken,
  MiddlewareHandler.validateFields(dt.verifyPassword),
  MiddlewareHandler.validateRegex(dt.regexPassword, 'password'),
  controller.verifyPassword
)
userRouter.get('/',
  MiddlewareHandler.validateQuery(dt.userQueries),
  controller.getAdmin
)
userRouter.get('/:id',
  MiddlewareHandler.middObjectId('id'),
  controller.getById
)
userRouter.put(
  '/profile/:id',
  Auth.verifyToken,
  MiddlewareHandler.middObjectId('id'),
  MiddlewareHandler.validateFields(dt.userProfile),
  UserHelper.protectPersonalAccount,
  controller.update
)
userRouter.put(
  '/upgrade/:id',
  Auth.verifyToken,
  Auth.checkRole([3,9]),
  MiddlewareHandler.middObjectId('id'),
  MiddlewareHandler.validateFields(dt.userUpgrade),
  UserHelper.userUpgradeDto,
  controller.update
)
userRouter.put(
  '/change/:id',
  Auth.verifyToken,
  Auth.checkRole([3,9]),
  MiddlewareHandler.middObjectId('id'),
  MiddlewareHandler.validateFields(dt.changePassword),
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
