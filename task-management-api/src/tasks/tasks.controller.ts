import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.USER)
    create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Request() req) {
        return this.tasksService.create(createTaskDto, req.user);
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.USER)
    findAll(@Request() req) {
        return this.tasksService.findAll(req.user.tenantId);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    findOne(@Param('id') id: string, @Request() req) {
        return this.tasksService.findOne(id, req.user.tenantId);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
        return this.tasksService.update(id, updateTaskDto, req.user.tenantId, req.user);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    remove(@Param('id') id: string, @Request() req) {
        return this.tasksService.remove(id, req.user.tenantId, req.user);
    }
}
