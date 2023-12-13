import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from '../auth/dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }
  @Get('me')
  getMe(
    @GetUser() user: User,
    @GetUser('id') userId: string,
  ) {
    console.log('userId', userId);
    return user;
  }

  @Patch('me')
  editUser(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto)
  }
}
