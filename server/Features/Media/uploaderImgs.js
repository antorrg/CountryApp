/* istanbul ignore file */
import eh from '../../Configs/errorHandlers.js'
import env from '../../Configs/envConfig.js'
import multer from 'multer'
//import { uploadImageToFirebase } from '../firebase.js'
import { mockUploader } from '../../../test/baseHelperTest/generalFunctions.js'

const catchController = eh.catchController
const imageUploaderService = env.Status !== 'production'? mockUploader : null

// Configuración de Multer para almacenamiento temporal
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Middleware para manejar la subida de archivos

export const uploadMiddleware = upload.single('image')

export const imageUploader = catchController(async (req, res)=>{
  const file = req.file
  console.log(req.file)
  if (!file){throwError('Not found', 404)}
  const imageUrl = await imageUploaderService(file)
  const response = {  success: true,
    message: 'Imagen subida exitosamente',
    data: { url: imageUrl }
  }
  //console.log('response: ', response)
  res.status(200).json(response)
})
