import {Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { UtilService } from 'src/common/services/util.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly utilSvc: UtilService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() login: LoginDto) {
    const { username, password } = login;

    //Verificar usujario y contraseña
    const user = await this.authSvc.getUserByUsername(username);
    if (!user) 
      throw new UnauthorizedException('Usuario o contraseña incorrectos');

    if (!await this.utilSvc.checkPassword(password, user.password)) {
        // Obtener la información del usuario (payload)
        const { password, username, ...payload } = user;

        //Generar el JWT
        const access_token = await this.utilSvc.generateJWT(payload);

        //Generar el refresh token
        const refresh_token = await this.utilSvc.generateJWT(payload);

        return { access_token, refresh_token };
    } else {
        
    }
  }

  // POST /auth/register - 201 Created

  @Get('/me')
  public getProfile() {}

  @Post('/refresh')
  public refreshToken() {}

  @Post('/logout')
  public logout() {}
}
