import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';
import Logging from './library/Logging';

const router = express();

mongoose.set('strictQuery', false);

// KẾT NỐI ĐẾN CƠ SỞ DỮ LIỆU MONGOOSE
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

// KHỞI ĐỘNG SERVER
const StartServer = () => {
    http.createServer(router).listen(config.server.port, () =>
        Logging.info(`Server is running on port ${config.server.port}.`)
    );
};
