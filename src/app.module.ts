import { Module } from '@nestjs/common';
import { AuthModule } from './auth/interfaces/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
