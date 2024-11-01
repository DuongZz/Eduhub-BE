import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';
import Logging from './library/Logging';
import router from './routes';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng router cho người dùng
app.use('/', router);

mongoose.set('strictQuery', false);

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info(`Running on ENV = ${process.env.NODE_ENV}`);
        Logging.info('Connected to mongoDB.');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect.');
        Logging.error(error);
    });

const StartServer = () => {
    http.createServer(app).listen(config.server.port, () =>
        Logging.info(`Server is running on port ${config.server.port}.`)
    );
};
