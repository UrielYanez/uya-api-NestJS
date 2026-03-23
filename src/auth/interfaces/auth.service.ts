import { Injectable } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { PrismaService } from "src/common/services/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    public async getUserByUsername(username: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: { username }
        });

    }
}