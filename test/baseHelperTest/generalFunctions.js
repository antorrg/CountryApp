import fs from 'fs/promises'
import path from 'path'

const throwError = (message, status) => {
  const error = new Error(message)
  error.status = status
  throw error
}
const LocalBaseUrl = process.env.LOCAL_BASE_URL

export async function mockUploader(file){
   try {
      const uploadDir = './uploads'
      // Asegurarse que exista la carpeta
      await fs.mkdir(uploadDir, { recursive: true })
      const newPath = path.join(uploadDir, file.originalname)
      await fs.writeFile(newPath, file.buffer)
      return `${LocalBaseUrl}/uploads/${file.originalname}`
    } catch (error) {
      console.error('Error subiendo: ', error)
      throw error
    }
}
export function mockDeleteFunction (url, result) {
  if (result) {
    return {
      success: true,
      message: `ImageUrl ${url} deleted succesfully`
    }
  } else {
    throwError(`Error processing ImageUrl ${url}`, 500)
  }
}
export const deletFunctionTrue = (url) => {
  return {
    success: true,
    message: `ImageUrl ${url} deleted succesfully`
  }
}
export const deletFunctionFalse = (url) => {
  throwError(`Error processing ImageUrl: ${url}`, 500)
}
