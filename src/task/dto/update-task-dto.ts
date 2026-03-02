import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator"

export class updateTaskDto {
    
    @IsOptional()
    @IsString({message: 'El nombre debe ser una cadena'})
    name?: string

    @IsOptional()
    @IsString({message: 'La descripción debe ser una cadena'})
    @MinLength(3, {message: 'La descripción debe tener al menos 3 caracteres'})
    description?: string
    
    @IsOptional()
    @IsBoolean({message: 'La prioridad debe ser un valor booleano'})
    priority?: boolean
    
    @IsOptional()
    @IsString({message: 'El userId debe ser un número'})
    userId?: number
}