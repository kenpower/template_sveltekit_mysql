import dotenv from 'dotenv';
dotenv.config();

export default {
	client: 'mysql2',
	connection: {
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		port: process.env.DATABASE_PORT
	},
	migrations: {
		directory: './migrations'
	},
	seeds: {
		directory: './seeds'
	}

	// production: {
	// 	client: 'mysql2',
	// 	connection: {
	// 		host: process.env.DATABASE_HOST,
	// 		user: process.env.DATABASE_USER,
	// 		password: process.env.DATABASE_PASSWORD,
	// 		database: process.env.DATABASE_NAME,
	// 		port: process.env.DATABASE_PORT
	// 	},
	// 	migrations: {
	// 		directory: './migrations'
	// 	},
	// 	seeds: {
	// 		directory: './seeds'
	// 	}
	// }
};
