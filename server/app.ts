import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import bluebird from "bluebird";
import cors from 'cors';
var errorhandler = require('errorhandler')
import { Environment } from './interfaces/env';
import { errorNotification } from './errors/handler';

mongoose.Promise = bluebird;

class App {
    public app: express.Application;

    constructor(private env: Environment) {
        this.app = express();
        this.initMW();
    }

    private initMW() {
        this.app.set('env', this.env);

        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(express.json({ limit: '20mb' }));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(function (req, res, next) {
            res.setTimeout(0);
            next();
        });
        if (this.env.NODE_ENV === 'development') {
            this.app.use(errorhandler({ log: errorNotification }))
        }
    }

    private async connectDb() {
        // When successfully connected
        mongoose.connection.on('connected', function () {
            console.log("Mongoose connected successfully!!");
        });

        // If the connection throws an error
        mongoose.connection.on('error', (err: any) => {
            console.error(err);
            console.log('%s MongoDB connection error. Please make sure MongoDB is running.', '✗');
            process.exit();
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose connection disconnected');
        });
        return mongoose.connect(this.env.MONGODB_URI || '');
    }

    public listen() {
        this.connectDb()
            .then(() => {
                var server = this.app.listen(this.env.PORT, () => {
                    console.log(`App listening on the port ${this.env.PORT}`);
                });
                server.timeout = this.env.TIMEOUT;
            });
    }
}

export default App;