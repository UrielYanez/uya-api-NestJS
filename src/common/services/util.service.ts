import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {

    constructor(private readonly jwtService: JwtService) {}

    public async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    public async checkPassword(password: string, hash: string)  {
        return await bcrypt.compare(password, hash);
    }

    public async generateJWT(payload: any, expiresIn: any = '60s') {
        return await this.jwtService.signAsync(payload, { 
            expiresIn: expiresIn });
    }

    public async getPayload(token: string) {
        return await this.jwtService.verifyAsync(token);
    }
}