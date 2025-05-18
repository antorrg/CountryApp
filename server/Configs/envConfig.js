import dotenv from 'dotenv'

const configEnv = {
  development: '.env.development',
  production: '.env.production',
  preview: '.env.development',
  test: '.env.test'
}

const envFile = configEnv[process.env.NODE_ENV] || '.env.production'
dotenv.config({ path: envFile })

const { PORT, URI_DB, JWT_SECRET, JWT_EXPIRES_IN, DEFAULT_IMG, EMAIL_ADMIN,PASS_ADMIN } = process.env
const Status = process.env.NODE_ENV

export default {
  Port: parseInt(PORT) || 3000,
  Status,
  UriDb: URI_DB,
  ExpiresIn: JWT_EXPIRES_IN,
  Secret: JWT_SECRET,
  DefaultImg : DEFAULT_IMG,
  EmailAdmin: EMAIL_ADMIN,
  PassAdmin: PASS_ADMIN
}

