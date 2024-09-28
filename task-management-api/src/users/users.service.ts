import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tenant } from 'src/entities/tenant.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Tenant)
        private tenantRepository: Repository<Tenant>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const tenant = await this.tenantRepository.findOne({ where: { id: createUserDto.tenantId } });
        if (!tenant) {
            throw new NotFoundException('Tenant não localizado');
        }

        const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
            throw new BadRequestException('Email já está sendo utilizado');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            tenant,
        });
        return this.usersRepository.save(user);
    }

    findAll(tenantId: string): Promise<User[]> {
        return this.usersRepository.find({
            where: { tenant: { id: tenantId } },
            relations: ['tenant'],
        });
    }

    findOne(id: string, tenantId: string): Promise<User> {
        return this.usersRepository.findOne({
            where: { id, tenant: { id: tenantId } },
            relations: ['tenant'],
        });
    }

    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email }, relations: ['tenant'] });
    }

    async update(id: string, updateUserDto: UpdateUserDto, tenantId: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id, tenant: { id: tenantId } },
        });
        if (!user) {
            throw new NotFoundException('Usuário não localizado');
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: string, tenantId: string): Promise<void> {
        const result = await this.usersRepository.delete({ id, tenant: { id: tenantId } });
        if (result.affected === 0) {
            throw new NotFoundException('Usuário não localizado');
        }
    }
}
