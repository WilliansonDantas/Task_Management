import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tenant } from "./tenant.entity";
import { Task } from "./task.entity";

export enum UserRole {
    ADMIN = "Admin",
    USER = "User",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Tenant, (tenant) => tenant.users, { onDelete: "CASCADE" })
    tenant: Tenant;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Task, (task) => task.createdBy)
    createdTasks: Task[];

    @OneToMany(() => Task, (task) => task.assignedTo)
    assignedTasks: Task[];
    userId: string;
}