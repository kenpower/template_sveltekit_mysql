import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 3000,
		host: '0.0.0.0',
		watch: {
			usePolling: true, // Enable polling to detect file changes
			interval: 1000 // Polling interval in milliseconds (adjust as needed)
		}
	}
});
