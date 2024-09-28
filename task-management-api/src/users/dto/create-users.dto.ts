import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    tenantId: string;
}