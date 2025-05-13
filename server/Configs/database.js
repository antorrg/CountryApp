import { connect } from 'mongoose'
import env from './envConfig.js'

const DB_URI = `${env.UriDb}`
// const DB_URI= `mongodb://${onlyOne}`

const connectDB = async () => {
  try {
    await connect(DB_URI)
    console.log('DB conectada exitosamente ✅')
  } catch (error) {
    console.error(error + ' algo malo pasó 🔴')
  }
}

export default connectDB
