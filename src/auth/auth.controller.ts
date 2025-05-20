import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUSER } from './IUser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(@Body() body: IUSER) {
    return this.authService.signIn(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signup(@Body() body: IUSER) {
    return this.authService.signUp(body);
  }
}
