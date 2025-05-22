import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-useer.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  loginUser(@Request() request: { user: { id: number; name: string } }) {
    return this.authService.login(request.user.id, request.user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(@Request() request: { user: { id: number } }) {
    return 'Now you can see this protected route. This is your user id: ' + request.user.id;
  }
}
