import winston from 'winston';
import 'winston-daily-rotate-file';
import dotenv from 'dotenv';

dotenv.config();

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
    filename: 'logs/errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error', 
    maxFiles: '14d',
    format: fileFormat
});

const ENVIRONMENT = process.env.NODE_ENV || 'development'

let transportsList = [];

if (ENVIRONMENT === 'production') {
    transportsList = [
        new winston.transports.Console({
            level: 'info',
            format: consoleFormat
        }),
        errorRotateTransport
    ];
} else {
    // Desarrollo
    transportsList = [
        new winston.transports.Console({
            level: 'debug',
            format: consoleFormat
        }),
        errorRotateTransport
    ]
}

export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: transportsList
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}