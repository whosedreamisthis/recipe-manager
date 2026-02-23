import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
		// ADD THIS LINE:
		seed: 'npx tsx ./prisma/seed.ts',
	},
	datasource: {
		// Make sure this matches the env name in your .env (POSTGRES_PRISMA_URL)
		url: process.env['POSTGRES_PRISMA_URL'] || process.env['DATABASE_URL'],
	},
});
