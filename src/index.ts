import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_request: Request, response: Response) => {
    response.send('<h1>Welcome to NodeJS</h1>');
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`running on port ${PORT}`);
});
