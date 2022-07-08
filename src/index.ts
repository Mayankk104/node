/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import middlewares from './middlewares/session';
import authRoute from './routes/auth';
import homeRoute from './routes/home';

const app = express();
const PORT = process.env.PORT || 3000;

console.clear();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(middlewares);
app.use(authRoute);
app.use(homeRoute);

mongoose.connect(process.env.DB_URL!)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
