import { createConnection } from 'mysql2/promise';

export const mySQLProvider = {
  provide: 'MYSQL_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    return connection;
  },
};
