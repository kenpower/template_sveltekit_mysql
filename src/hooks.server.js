// hooks.server.js is
// a file that contains server-side hooks that run before the request is processed by the server.
// You can use server-side hooks to authenticate users, redirect users, and more.

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @typedef {Object} Locals
 * @property {Object} [user] - The authenticated user object
 */

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
const user_from_login_token = (event) => {
	const token = event.url.searchParams.get('token');
	if (token) {
		//decode the jwt token
		const AUTH_SERVICE_JWT_SECRET_KEY = process.env.AUTH_SERVICE_JWT_SECRET_KEY;

		try {
			const user = jwt.verify(token, AUTH_SERVICE_JWT_SECRET_KEY);
			return user;
		} catch (error) {
			console.log('Error decoding login token:', error);
		}
	}

	return null;
};

const JWT_COOKIE_SECRET_KEY = process.env.JWT_COOKIE_SECRET_KEY;

const getUserFromSessionCookie = (event) => {
	if (event.cookies.get('session_id')) {
		console.log('Session_id cookie found');
		try {
			const user = jwt.verify(event.cookies.get('session_id'), JWT_COOKIE_SECRET_KEY);
			console.log('Decoded user from session cookie:', user);
			return user;
		} catch (error) {
			console.log('Error decoding JWT token in cookie:', error);
		}
	}
	return null;
};

const getUserAndSetCookieFromLoginToken = (event) => {
	console.log('Checking for login token in URL');
	const user = user_from_login_token(event);
	if (user) {
		delete user.iat;
		delete user.exp;
		const token = jwt.sign(user, JWT_COOKIE_SECRET_KEY, { expiresIn: '30d' });
		console.log('Encoded user from login token:', user);
		console.log('Setting session_id cookie');
		event.cookies.set('session_id', token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		});
		return user;
	} else {
		console.log('No login token found in URL');
	}
};

export async function handle({ event, resolve }) {
	console.log('Running server-side hook');
	console.log('===========================');
	// Check if the user is loggedin, authenticated
	event.locals.user = getUserFromSessionCookie(event) ?? getUserAndSetCookieFromLoginToken(event);

	const url = new URL(event.url.href);

	// Redirect to login if the user is not authenticated
	if (!event.locals.user) {
		url.search = '';
		console.log('User not authenticated, redirecting to sign in service');
		return Response.redirect(`https://compucore.itcarlow.ie/auth/sign_in?redirect=${url.href}`);
	}

	return await resolve(event);
}
