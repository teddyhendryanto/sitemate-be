import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { EncryptionService } from '../encryption/encryption.service';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
    private encryptionService: EncryptionService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.userService.findOneByAttribute({
      where: { email },
    });

    if (!user) throw new NotFoundException(`User not found.`);

    const isPasswordValid = await this.encryptionService.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException(`Password not valid.`);

    const jwtExpiredIn = this.configService.get('JWT_EXPIRED_IN');
    const jwtExpiredInValue = jwtExpiredIn.replace(/[^\d.-]+/g, '');
    const jwtExpiredInUnit = jwtExpiredIn.replace(/[\d.-]+/g, '');
    const currentTime = moment();
    const expiredAt = currentTime.add(Number(jwtExpiredInValue), jwtExpiredInUnit).unix();

    const payload = { iat: moment().unix(), sub: user.id, exp: expiredAt };

    return {
      accessToken: this.jwtService.sign(payload),
      expiredAt,
    };
  }
}
