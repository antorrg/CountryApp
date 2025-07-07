import db from 'mongoose'
import env from './envConfig.js'
import eh from './errorHandlers.js'

const DB_URI = `${env.UriDb}`
// const DB_URI= `mongodb://${onlyOne}`

const connectDB = async () => {
  try {
    await db.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000 // ⏱️ Timeout si no responde el servidor
    })
    console.log('DB conectada exitosamente ✅')
  } catch (error) {
    console.error(error + ' algo malo pasó 🔴')
  }
  // Manejo de eventos de conexión
  // db.connection.on('disconnected', () => {
  //   console.error('🔴 Se perdió la conexión con la base de datos')
  //   //process.exit(1)
  //   // Aquí puedes notificar al front, reiniciar el server, etc.
  // })

// db.connection.on('reconnected', () => {
//   console.log('🟢 Se reconectó la base de datos')
// })
}

export default connectDB
