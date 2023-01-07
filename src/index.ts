import express, { Request, Response } from 'express';
import logger from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_request: Request, response: Response) => {
    response.send('<h1>Welcome to NodeJS</h1>');
});

app.listen(PORT, () => {
    logger.info(`running on port ${PORT}`);
});
