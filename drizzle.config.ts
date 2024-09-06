import '@/drizzle/envConfig';
import { type Config, defineConfig } from 'drizzle-kit';

// export default defineConfig({
//   schema: './src/db/schema.ts',
//   out: './migrations',
//   dialect: 'postgresql',
//   dbCredentials: {
//     url: process.env.POSTGRES_URL!,
//   },
// });

export default defineConfig({
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
  // tablesFilter: ['nuvela_*'],
}) as Config;
