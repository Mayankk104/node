import Session from 'express-session';
import express from 'express';
import path from 'path';

const session = Session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
});

export default [express.static(path.join(__dirname, '..', 'public')), express.urlencoded({ extended: true }), session];
