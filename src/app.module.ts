import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AppConfig, routes } from './config';
import { DatabaseModule } from './databases/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { UserModule } from './modules/user/user.module';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
    DatabaseModule,
    EncryptionModule,
    RouterModule.register(routes),
    UserModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
