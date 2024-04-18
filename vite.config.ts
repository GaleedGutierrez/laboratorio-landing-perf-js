import { defineConfig, UserConfigExport } from 'vite';

const config: UserConfigExport = {
	base: './',
	server: {
		open: './',
		port: 8080,
		host: true,
	},
	build: {
		sourcemap: true,
		manifest: true,
	},
};

export default defineConfig(config);
