/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	// Insert two test users
	await knex('users').insert([
		{ username: 'Test User 1', email: 'testuser1@example.com', password: 'password' },
		{ username: 'Test User 2', email: 'testuser2@example.com', password: 'password' }
	]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	await knex('users').whereIn('email', ['testuser1@example.com', 'testuser2@example.com']).del();
}
