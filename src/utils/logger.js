import winston from 'winston'
import 'winston-daily-rotate-file'
import { envConfig } from '../config/env.config.js'

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red bold',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
};

winston.addColors(customLevelOptions.colors);

const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
);

const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
    )
);

const errorRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error', 
    maxFiles: '14d',
    format: fileFormat
});

const combinedRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'info',
    maxFiles: '14d',
    format: fileFormat
});

const transportsList = [
    errorRotateTransport,
    combinedRotateTransport
];

if (envConfig.NODE_ENV !== 'production') {
    transportsList.push(
        new winston.transports.Console({
            level: 'debug',
            format: consoleFormat
        })
    );
}

export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: transportsList
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};