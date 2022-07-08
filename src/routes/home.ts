import { Router } from 'express';
import getDashboard from '../controllers/home';
import { isAuth } from '../middlewares/auth';

const homeRoute = Router();

homeRoute.get('/', isAuth, getDashboard);

export default homeRoute;
