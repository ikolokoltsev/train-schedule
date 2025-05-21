import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-useer.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return this.userService.create(createUserDto);
  }
  async validateLocalUSer(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.password) throw new UnauthorizedException('User password not set');
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    return { id: user.id, name: user.name };
  }
}
