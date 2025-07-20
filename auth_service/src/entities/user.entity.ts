import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    firstName: string;

    @Column({ length: 20 })
    lastName: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    password: string;

    @Column({ type: "timestamp" })
    createdAt: Date;

    @Column({ type: "timestamp" })
    updatedAt: Date;
}