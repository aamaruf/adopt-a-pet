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

    @Column({ nullable: true, unique: false })
    email?: string;

    @Column({ nullable: true })
    image?: string;

    @Column({ nullable: true })
    thumb?: string;

    @Column({ nullable: true })
    slug?: string;

    @Column({ nullable: true, type: "int", default: 0 })
    priority?: number;

    @Column({ nullable: true })
    tags?: string;

    @OneToMany(
        (type) => Pet,
        (pet) => pet.user
    )
    pets?: Pet[];

}
