import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserCredentials } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() credentials: UserCredentials) {
    return this.userService.login(credentials);
  }

  @Post('/signup')
  signup(@Body() user: User) {
    return this.userService.signup(user);
  }
}
