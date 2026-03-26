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

    public getUserById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    public async updateHash(user_id: number, hash: string | null): Promise<User> {
        return await this.prisma.user.update({
            where: { id: user_id },
            data: { hash }
        });
    }
}