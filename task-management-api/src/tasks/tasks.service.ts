import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tenant } from 'src/entities/tenant.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
        private usersService: UsersService,
    ) { }

    async create(createTaskDto: CreateTaskDto, req): Promise<Task> {
        const { tenantId, userId, username } = req
        const task = this.tasksRepository.create({
            ...createTaskDto,
            tenant: { id: tenantId } as Tenant,
            createdBy: { id: userId } as User,
            assignedTo: userId,
        });

        return this.tasksRepository.save(task);
    }

    findAll(tenantId: string): Promise<Task[]> {
        return this.tasksRepository.find({
            where: { tenant: { id: tenantId } },
            relations: ['createdBy', 'assignedTo'],
        });
    }

    findOne(id: string, tenantId: string): Promise<Task> {
        return this.tasksRepository.findOne({
            where: { id, tenant: { id: tenantId } },
            relations: ['createdBy', 'assignedTo'],
        });
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, tenantId: string, user: User): Promise<Task> {
        const task = await this.tasksRepository.findOne({
            where: { id, tenant: { id: tenantId } },
            relations: ['createdBy'],
        });
        if (!task) {
            throw new NotFoundException('Tarefa não localizada');
        }

        if (task.createdBy.id !== user.userId && user.role !== 'Admin') {
            throw new ForbiddenException('Acesso negado');
        }

        Object.assign(task, updateTaskDto);
        return this.tasksRepository.save(task);
    }

    async remove(id: string, tenantId: string, user: User): Promise<void> {
        const task = await this.tasksRepository.findOne({
            where: { id, tenant: { id: tenantId } },
            relations: ['createdBy'],
        });
        if (!task) {
            throw new NotFoundException('Tarefa não localizada');
        }

        if (task.createdBy.id !== user.userId && user.role !== 'Admin') {
            throw new ForbiddenException('Acesso negado');
        }

        await this.tasksRepository.delete(id);
    }
}
