import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RolesGuard } from "src/auth/roles.guard";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { UpdateTenantDto } from "./dto/update-tenant.dto";
import { TenantsService } from "./tenants.service";

@Controller("tenants")
export class TenantsController {
    constructor(private readonly tenantService: TenantsService) { }

    @Post()
    create(@Body() createTenantDto: CreateTenantDto) {
        return this.tenantService.create(createTenantDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll() {
        return this.tenantService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(":id")
    findOne(@Param('id') id: string) {
        return this.tenantService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(":id")
    update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
        return this.tenantService.update(id, updateTenantDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    remove(@Param('id') id: string) {
        return this.tenantService.remove(id);
    }
}