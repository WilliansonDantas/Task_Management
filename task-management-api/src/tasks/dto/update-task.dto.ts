import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from '../../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsDateString()
    deadline?: string;
}