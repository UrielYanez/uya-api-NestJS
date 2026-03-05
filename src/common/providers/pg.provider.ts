import { Client } from 'pg';

export const pgProvider = {
  provide: 'POSTGRES_CONNECTION',
  useFactory: async () => {
    const client = new Client({
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });
    await client.connect();
    return client;
  },
};
