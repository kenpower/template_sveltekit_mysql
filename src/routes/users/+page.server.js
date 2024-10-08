// src/routes/users/+page.server.js
import db from '$lib/db';

export const load = async () => {
	try {
		console.error('fetching users:');
		const users = await db('users').select('*');
		console.error(
			'fetched users:',
			users,
			typeof users,
			users.length,
			'is Array=' + Array.isArray(users)
		);
		return { users: users, a: 42 };
	} catch (error) {
		console.error('Error fetching users:', error);
		return { users: [], a: 42 }; // Return an empty list in case of an error
	}
};
