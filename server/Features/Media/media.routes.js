import express from 'express'
import BaseService from '../../Shared/Services/BaseService.js'
import Media from '../../Shared/Models/media.js'
import { MediaDTO } from './Media.DTO.js'
import * as img from './uploaderImgs.js'



export const mediaService = new BaseService(Media, false, null, MediaDTO.parser, 'Media')

const mediaRouter = express.Router()
mediaRouter.post(
  '/upload',
  img.uploadMiddleware,
  img.imageUploader
)
export default mediaRouter

