import { Router } from 'express';
import {
    getSignin, getSignup, postLogout, postSignin, postSignup,
} from '../controllers/auth';
import { Authenticated } from '../middlewares/auth';

const authRoute = Router();

authRoute.get('/signup', Authenticated, getSignup);
authRoute.get('/signin', Authenticated, getSignin);
authRoute.post('/signup', postSignup);
authRoute.post('/signin', postSignin);
authRoute.post('/logout', postLogout);

export default authRoute;
