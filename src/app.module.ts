import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './config';
import { DatabaseModule } from './databases/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
