import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    const saltRounds = Number(this.configService.get('JWT_SECRET'));
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash(password, salt);

    return hashed;
  }

  async compare(password: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }
}
