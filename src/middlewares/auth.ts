import { NextFunction, Request, Response } from 'express';
import { Session } from 'express-session';

export function isAuth(request: Request, response: Response, next: NextFunction) {
    const { session }: { session: Session & Partial<{isAuth: boolean}> } = request;
    if (session.isAuth) { next(); } else { response.redirect('/signin'); }
}

export function Authenticated(request: Request, response: Response, next: NextFunction) {
    const { session }: { session: Session & Partial<{isAuth: boolean}> } = request;
    if (!session.isAuth) { next(); } else { response.redirect('/'); }
}
