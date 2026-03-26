import {Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { UtilService } from 'src/common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guards';

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
        const access_token = await this.utilSvc.generateJWT(payload, '1h');

        //Generar el refresh token
        const refresh_token = await this.utilSvc.generateJWT(payload, '7d');
        const hashRT = await this.utilSvc.hashPassword(refresh_token);

        // Actualizar el hash del refresh token en la base de datos
        await this.authSvc.updateHash(user.id, hashRT);

        //Asignar hash al usuario
        payload.hash = hashRT;

        //Regresar el refresh token
        return { access_token, refresh_token };
    } else {
        
    }
  }

  // POST /auth/register - 201 Created

  @Get('/me')
  @UseGuards(AuthGuard)
  public getProfile(@Req() request: any) {
    const { user } = request['user'];
    return user;
  }

  @Post('/refresh')
  @UseGuards(AuthGuard)
  public async refreshToken(@Req() request: any) {
    const sessionUser = request['user'];
    const user = await this.authSvc.getUserById(sessionUser.id);
    if (!user || !user.hash)
        throw new ForbiddenException('Acceso Denegado');

      // Verificar que el hash del refresh token en la base de datos coincida con el hash del token proporcionado
      if(sessionUser.hash !== user.hash)
        throw new ForbiddenException('Token no válido');
    
    return{
      access_token: '',
      refresh_token: ''
    }
  }

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async logout(@Req() request: any) {
    const session = request['user'];
    const user = await this.authSvc.updateHash(session.id, null);
  }
}
