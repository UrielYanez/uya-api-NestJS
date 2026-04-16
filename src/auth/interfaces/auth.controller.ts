import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { UtilService } from 'src/common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { AppException } from 'src/common/exceptions/app.exception';
import type { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly utilSvc: UtilService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() login: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { username, password } = login;

    //Verificar usujario y contraseña
    const user = await this.authSvc.getUserByUsername(username);
    if (!user)
      throw new UnauthorizedException('Usuario o contraseña incorrectos');

    if (await this.utilSvc.checkPassword(password, user.password)) {
      // Obtener la información del usuario (payload)
      const { password, username, ...payload } = user;

      //Generar el JWT
      const access_token = await this.utilSvc.generateJWT(payload, '1h');

      //Generar el refresh token
      const refresh_token = await this.utilSvc.generateJWT(payload, '7d');
      const hashRT = await this.utilSvc.hashPassword(refresh_token);

      // Actualizar el hash del refresh token en la base de datos
      await this.authSvc.updateHash(user.id, hashRT);

      //Asignar hash al usuario
      payload.hash = hashRT;

      // INYECTAR COOKIES HTTPONLY (El escudo contra XSS)
      res.cookie('access_token', access_token, {
        httpOnly: true, // Javascript en el navegador NO puede leerla
        secure: false, // Solo en localhost es false. En producción (HTTPS) debe ser true.
        sameSite: 'lax', // Protege contra ataques CSRF
        maxAge: 1000 * 60 * 60, // 1 hora
      });

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
      });

      return { message: 'Inicio de sesión exitoso' };
    } else {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }
  }

  // POST /auth/register - 201 Created

  @Get('/me')
  @UseGuards(AuthGuard)
  public getProfile(@Req() request: any) {
    return request['user'];
  }

  @Post('/refresh')
  @UseGuards(AuthGuard)
  public async refreshToken(
    @Req() request: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const sessionUser = request['user'];
    const user = await this.authSvc.getUserById(sessionUser.id);
    if (!user || !user.hash)
      throw new AppException('Token no válido', HttpStatus.FORBIDDEN, '2');
    // throw new ForbiddenException('Acceso Denegado');

    // Verificar que el hash del refresh token en la base de datos coincida con el hash del token proporcionado
    if (sessionUser.hash !== user.hash)
      throw new ForbiddenException('Token no válido');

    const { password, username, hash, ...payload } = user;

    const access_token = await this.utilSvc.generateJWT(payload, '1h');
    const refresh_token = await this.utilSvc.generateJWT(payload, '7d');
    const hashRT = await this.utilSvc.hashPassword(refresh_token);
    
    await this.authSvc.updateHash(user.id, hashRT);

    // Reemplazamos las cookies viejas por las nuevas
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { message: 'Tokens renovados' };
  }

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async logout(
    @Req() request: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = request['user'];
    await this.authSvc.updateHash(session.id, null);

    // Destruimos las cookies en el navegador
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
