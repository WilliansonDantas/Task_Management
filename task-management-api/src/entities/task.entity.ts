import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Tenant } from "./tenant.entity";

export enum TaskStatus {
    PENDENTE = "Pendente",
    EM_PROGRESSO = "Em Progresso",
    CONCLUIDA = "Concluída",
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.PENDENTE,
    })
    status: TaskStatus;

    @Column()
    deadline: Date;

    @ManyToOne(() => User, (user) => user.createdTasks)
    createdBy: User;

    @ManyToOne(() => User, (user) => user.assignedTasks)
    assignedTo: User;

    @ManyToOne(() => Tenant, (tenant) => tenant.tasks, { onDelete: "CASCADE" })
    tenant: Tenant;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
