import dotenv from 'dotenv'

const configEnv = {
  development: '.env.development',
  production: '.env.production',
  preview: '.env.development',
  test: '.env.test'
}

const envFile = configEnv[process.env.NODE_ENV] || '.env.production'
dotenv.config({ path: envFile })

const { PORT, URI_DB } = process.env
const Status = process.env.NODE_ENV

export default {
  Port: parseInt(PORT) || 3000,
  Status,
  UriDb: URI_DB
}
