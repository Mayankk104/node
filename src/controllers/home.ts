import { Request, Response } from 'express';
import { Session } from 'express-session';

export default async function getDashboard(request: Request, response: Response) {
    const { session }:{session: Session & Partial<{user: string}>} = request;
    response.render('home', { user: session.user, title: 'Dashboard' });
}
