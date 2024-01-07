import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';
import { UserDocument } from './models/users.schema';
import { CurrentUser } from '../../../../libs/common/src/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
