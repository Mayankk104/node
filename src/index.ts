/* eslint-disable no-console */
import mongoose from 'mongoose';
import express from 'express';
import middlewares from './middlewares/session';
import authRoute from './routes/auth';
import homeRoute from './routes/home';
import workerRoutes from './routes/worker-threads';

const app = express();
const PORT = process.env.PORT || 3000;

console.clear();

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.json());

app.use(middlewares);
app.use(authRoute);
app.use(homeRoute);
app.use(workerRoutes);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL!)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`running on port ${PORT}`);
        });
    })
    .catch((error: any) => {
        console.log(error);
    });
