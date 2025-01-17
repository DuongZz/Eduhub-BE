import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import Logging from './library/Logging';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from "passport";
import session from "express-session";

import config from './config/config';
import corsConfig from './config/corsConfig';
import PassportGoogle from './config/google';
import PassportFacebook from './config/facebook';

import router from './routes';

const app = express();

app.use(corsConfig)
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

PassportGoogle(app)
PassportFacebook(app)

app.use('/v1', router);

mongoose.set('strictQuery', false);

app.get("/", (req, res) => {
    res.send("<a href='/auth/facebook'>Login with facebook</a>");
});

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
