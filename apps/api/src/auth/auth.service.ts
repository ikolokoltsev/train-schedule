import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-useer.dto';
import { AuthJwtPayload } from './types/auth-jwtPayloads';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return this.userService.create(createUserDto);
  }
  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.password) throw new UnauthorizedException('User password not set');
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    return { id: user.id, name: user.name };
  }
  async login(userId: number, name?: string) {
    const { accessToken } = await this.generateToken(userId);
    return {
      id: userId,
      name,
      accessToken,
    };
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { id: userId };
    const [accessToken] = await Promise.all([this.jwtService.signAsync(payload)]);
    return {
      accessToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const currentUser = { id: user.id };
    return currentUser;
  }
}
