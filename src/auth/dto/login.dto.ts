import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    
    username: string;
    
    
    password: string;
}