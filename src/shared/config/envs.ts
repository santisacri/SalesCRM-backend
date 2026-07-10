import 'dotenv/config'
import env from 'env-var'

const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    IN_PRODUCTION: env.get('IN_PRODUCTION').required().asBool(),
    DB_USER: env.get('DB_USER').required().asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
    DB_NAME: env.get('DB_NAME').required().asString(),
    DATABASE_URL: env.get('DATABASE_URL').required().asUrlString()
}

export default envs