import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { IGetUser, IUserUpdate } from 'src/auth/IUser';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getUser')
  getUser(@Req() req: Request) {
    return req.user;
  }

  @Post('/list')
  list() {
    return this.userService.userList();
  }

  @Post('/get/:_id')
  getUserById(@Param() param: IGetUser) {
    return this.userService.getUserById(param._id);
  }

  @Post('/delete/:_id')
  deleteUserById(@Param() param: IGetUser) {
    return this.userService.deleteUserById(param._id);
  }

  @Post('update/:_id')
  updateUser(@Param() param: IGetUser, @Body() body: IUserUpdate) {
    return this.userService.updateUser(param._id, body);
  }
}
