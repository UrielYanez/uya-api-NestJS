import { Injectable } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class AuthService {
    public login(loginDto: LoginDto): string {
        return "User logged in";
    }
}