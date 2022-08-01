import { BaseEntity } from "src/@applications/base/entities/base.entity";
import { Pet } from "src/@modules/pets/entities/pet.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
    public static readonly SEARCH_TERMS = ["name", "slug"];
    public static readonly ORDERS = ["createdAt"];
    public static readonly RELATIONS = [];

    @Column({ nullable: true, unique: false })
    name?: string;

    @Column({ nullable: true, unique: true })
    email?: string;

    @Column({ nullable: true, unique: true })
    phoneNumber?: string;

    @Column({ nullable: true, unique: true })
    userName?: string;

    @Column({ nullable: true, unique: false })
    password?: string;

    @Column({ nullable: true, unique: false, select: false })
    rawPassword?: string;

    @Column({ nullable: true })
    avatar?: string;

    @OneToMany(
        (type) => Pet,
        (pet) => pet.user
    )
    pets?: Pet[];

}
