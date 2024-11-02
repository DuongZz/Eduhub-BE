import dotenv from 'dotenv';

dotenv.config();

// DECLARE ALL VARIABLES
const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
const NODE_ENV = process.env.NODE_ENV || '';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@eduhub.2m44j.mongodb.net/?retryWrites=true&w=majority&appName=eduhub`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGO_URL_LOCAL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@eduhub.2m44j.mongodb.net/?retryWrites=true&w=majority&appName=eduhub`;
const SECRET_ACCESS_TOKEN = process.env.JWT_ACCESS;
const SECRET_REFRESH_TOKEN = process.env.JWT_REFRESH;
//CREATE CONFIG OBJECT
const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
    token: {
        access: SECRET_ACCESS_TOKEN,
        refresh: SECRET_REFRESH_TOKEN
    }
};

//CHECK FOR ENVIRONMENT
if (NODE_ENV === 'development') {
    config.mongo.url = MONGO_URL;
    config.server.port = SERVER_PORT;
} else if (NODE_ENV === 'local') {
    config.mongo.url = MONGO_URL_LOCAL;
    config.server.port = SERVER_PORT;
}

//EXPORT
export default config;
