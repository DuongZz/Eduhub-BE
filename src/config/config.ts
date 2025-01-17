import dotenv from 'dotenv';

dotenv.config();

// DECLARE ALL VARIABLES
const EDUHUB_HOST = process.env.EDUHUB_HOST;
const AVT_DF = process.env.AVT_DF;
const POSTER_DF = process.env.POSTER_DF;
const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
const NODE_ENV = process.env.NODE_ENV || '';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@eduhub.2m44j.mongodb.net/?retryWrites=true&w=majority&appName=eduhub`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGO_URL_LOCAL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@eduhub.2m44j.mongodb.net/?retryWrites=true&w=majority&appName=eduhub`;
const SECRET_ACCESS_TOKEN = process.env.JWT_ACCESS;
const SECRET_REFRESH_TOKEN = process.env.JWT_REFRESH;
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
const S3_REGION = process.env.S3_REGION
const S3_BUCKET = process.env.S3_BUCKET
const HOST_MAIL = process.env.HOST_MAIL
const SENDER_EMAIL = process.env.SENDER_EMAIL
const PASS_APP = process.env.PASS_APP
// MOMO
const MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY;
const MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY;
const REDIRECT_URL_MOMO = process.env.REDIRECT_URL_MOMO;
const IPN_URL_MOMO = process.env.IPN_URL_MOMO;
const ENDPOINT_MOMO = process.env.ENDPOINT_MOMO;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// ZALO
const ZALO_API_ID = process.env.ZALO_API_ID
const ZALO_KEY_1 = process.env.ZALO_KEY_1
const ZALO_KEY_2 = process.env.ZALO_KEY_2
const ENDPOINT_ZALO = process.env.ENDPOINT_ZALO
const ZALO_CALLBACK = process.env.ZALO_CALLBACK


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
    },
    s3: {
        access_key: S3_ACCESS_KEY,
        secret_key: S3_SECRET_KEY,
        region: S3_REGION,
        bucket: S3_BUCKET
    },
    email: {
        host_mail: HOST_MAIL,
        sender_email: SENDER_EMAIL,
        pass_app: PASS_APP
    },
    momo: {
        accessKey: MOMO_ACCESS_KEY,
        secretKey: MOMO_SECRET_KEY,
        orderInfo: "PayWithMOMO",
        partnerCode: "MOMO",
        redirectUrl: REDIRECT_URL_MOMO,
        ipnUrl: IPN_URL_MOMO,
        requestType: "payWithMethod",
        amount: "",
        extraData: "",
        autoCapture: true,
        lang: "vi",
        endpoints: ENDPOINT_MOMO,
    },
    zalo: {
        zalo_api_id: ZALO_API_ID,
        zalo_key1: ZALO_KEY_1,
        zalo_key2: ZALO_KEY_2,
        zalo_callback: ZALO_CALLBACK,
        zalo_endpoint: ENDPOINT_ZALO
    },
    avatar: AVT_DF,
    poster: POSTER_DF,
    gemini: GEMINI_API_KEY,
    eduhub_host: EDUHUB_HOST
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
