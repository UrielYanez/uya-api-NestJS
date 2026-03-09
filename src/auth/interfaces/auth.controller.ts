import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "../dto/login.dto";

@Controller("api/auth")
export class AuthController {

    constructor(private authSvc: AuthService) {}

    // POST /auth/register - 201 Created

    @Post()
    @HttpCode(HttpStatus.OK)
    public login(@Body() loginDto: LoginDto) {
        const { username, password } = loginDto;

    }

    

    @Get("/me")
    public getProfile() {

    }

    @Post("/refresh")
    public refreshToken(){

    }

    @Post("/logout")
    public logout() {

    }

}