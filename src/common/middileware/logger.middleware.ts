import { Middleware, NestMiddleware, Injectable, ExpressMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): ExpressMiddleware {
        // await someAsyncFn();
        return (req, res, next) => {
            console.log('Request...');
            next();
        };
    }
}

// method 2 
// export const loggerMiddleware = (req, res, next) => {
//     console.log(`Request...`);
//     next();
// };