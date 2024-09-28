import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createUserDto: CreateUserDto, @Request() req) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @Roles(UserRole.ADMIN)
    findAll(@Request() req) {
        return this.usersService.findAll(req.user.tenantId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @Roles(UserRole.ADMIN)
    findOne(@Param('id') id: string, @Request() req) {
        return this.usersService.findOne(id, req.user.tenantId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
        return this.usersService.update(id, updateUserDto, req.user.tenantId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string, @Request() req) {
        return this.usersService.remove(id, req.user.tenantId);
    }
}

