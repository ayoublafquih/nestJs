import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signup(authDto: AuthDto) {
    const hash = await argon.hash(
      authDto.password,
    );
    try {
      delete authDto.password;
      const user = await this.prisma.user.create({
        data: {
          ...authDto,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      } else {
        throw error;
      }
    }
  }

  async signin(authDto: AuthDto) {
    const user =
      await this.prisma.user.findUnique({
        where: { email: authDto.email },
      });
    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }
    const pwMatches = await argon.verify(
      user.hash,
      authDto.password,
    );
    if (!pwMatches) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const data = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(data, {
      expiresIn: '15m',
      secret:
        this.config.get<string>('SECRET_JWT'),
    });

    return { access_token: token };
  }
}
