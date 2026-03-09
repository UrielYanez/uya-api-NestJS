import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // <-- Importación corregida
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config'; // <-- ESTO ES CLAVE: asegura que lea tu .env

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const url = process.env.DATABASE_URL;
    
    // Pequeña validación para evitar errores confusos
    if (!url) {
      throw new Error('DATABASE_URL no está definida en el archivo .env');
    }

    // Inicializamos el adaptador de MariaDB exigido por Prisma v7
    const adapter = new PrismaMariaDb(url);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}