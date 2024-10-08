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
		const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

		try {
			const user = jwt.verify(token, JWT_SECRET_KEY);
			return user;
		} catch (error) {
			console.log('Error decoding login token:', error);
		}
	}

	return null;
};

export async function handle({ event, resolve }) {
	// Check if the user is authenticated

	console.log('Full URL:', event.url.href);

	event.locals.user = null;

	const JWT_COOKIE_SECRET_KEY = process.env.JWT_COOKIE_SECRET_KEY;
	if (event.cookies.get('session_id')) {
		console.log('Session_id cookie found');
		try {
			const user = jwt.verify(event.cookies.get('session_id'), JWT_COOKIE_SECRET_KEY);
			console.log('Decoded user from session cookie:', user);
			event.locals.user = user;
		} catch (error) {
			console.log('Error decoding JWT token in cookie:', error);
		}
	}
	if (!event.locals.user) {
		console.log('Checking for login token in URL');
		const user = user_from_login_token(event);
		if (user) {
			event.locals.user = user;
			const token = jwt.sign(user, JWT_COOKIE_SECRET_KEY);
			console.log('Encoded user from login token:', user);
			console.log('Setting session_id cookie');
			event.cookies.set('session_id', token, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production'
			});
		} else {
			console.log('No login token found in URL');
		}
	}

	// Redirect to login if the user is not authenticated and accessing a protected route
	if (!event.locals.user) {
		console.log('User not authenticated, redirecting to sign in service');
		//go to sign in service
		const url = new URL(event.url.href);
		url.search = ''; // Remove the old token from the URL
		console.log(url.href);
		return Response.redirect(`https://compucore.itcarlow.ie/auth/sign_in?redirect=${url.href}`);
	}
	// Continue to the requested route
	return await resolve(event);
}
