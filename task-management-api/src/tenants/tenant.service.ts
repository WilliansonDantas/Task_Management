import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tenant } from "src/entities/tenant.entity";
import { Not, Repository } from "typeorm";
import { CreateTenantDto } from "./create-tenant.dto";
import { updateTenantDto } from "./update-tenant.dto";

@Injectable()
export class TenantService {
    constructor(
        @InjectRepository(Tenant)
        private tenantRepository: Repository<Tenant>,
    ) { }

    create(createTenantDto: CreateTenantDto): Promise<Tenant> {
        const tenant = this.tenantRepository.create(createTenantDto);
        return this.tenantRepository.save(tenant);
    }

    findAll(): Promise<Tenant[]> {
        return this.tenantRepository.find();
    }

    findOne(id: string): Promise<Tenant> {
        return this.tenantRepository.findOne({ where: { id } });
    }

    async update(id: string, updateTenantDto: updateTenantDto): Promise<Tenant> {
        await this.tenantRepository.update(id, updateTenantDto);
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant) {
            throw new NotFoundException("Tenant não localizado");
        }
        return tenant;
    }

    async remove(id: string): Promise<void> {
        await this.tenantRepository.delete(id);
    }
}