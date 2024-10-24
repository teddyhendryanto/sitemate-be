import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../databases/entities';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [],
})
export class UserModule {}
