import { createConnection } from "mysql2/promise";

export const mySQLProvider = {
  provide: 'MYSQL_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection({
      host: 'localhost',
      port: 3306,
      user: 'admin',
      password: 'root',
      database: 'gids6081_db'
    });
    return connection;
  }
}