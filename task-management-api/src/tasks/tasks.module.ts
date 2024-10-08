import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Task]),
        UsersModule],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService],
})
export class TasksModule { }