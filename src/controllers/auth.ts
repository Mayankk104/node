import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcryptjs';
import { Session } from 'express-session';
import User from '../models/User';

export function getSignin(request: Request, response: Response) {
    response.render('auth/signin', { title: 'sign in' });
}

export function getSignup(request: Request, response: Response) {
    response.render('auth/signup', { title: 'sign up' });
}

export async function postSignup(request: Request, response: Response) {
    const { username, password }: { username?: string, password: string } = request.body;

    const user = await User.findOne({ username });

    if (user) {
        return response.redirect('/signin');
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    const newUser = new User({ username, password: hashPassword });
    await newUser.save();

    return response.redirect('/signin');
}

export async function postSignin(request: Request, response: Response) {
    const { username, password } = request.body;
    const { session }:{session: Session & Partial<{user: string, isAuth: boolean}>} = request;

    const user = await User.findOne({ username });

    if (!user) {
        response.redirect('/signin');
    }

    const isMatch = await compare(password, user?.password!);

    if (!isMatch) {
        return response.redirect('/signin');
    }
    session.user = user?.username;
    session.isAuth = true;
    return response.redirect('/');
}

export function postLogout(request: Request, response: Response) {
    const { session } = request;

    session.destroy((err) => {
        console.log(err);
    });

    response.redirect('/signin');
}
