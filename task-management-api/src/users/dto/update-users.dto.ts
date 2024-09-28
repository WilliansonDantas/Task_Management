import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-users.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    password?: string;
}