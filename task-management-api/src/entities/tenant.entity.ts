import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}