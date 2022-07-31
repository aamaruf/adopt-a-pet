import { BaseEntity } from "src/@applications/base/entities/base.entity";
import { User } from "src/@modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";

@Entity("pets")
export class Pet extends BaseEntity {
    public static readonly SEARCH_TERMS = ['name', 'species'];
    public static readonly ORDERS = ["createdAt"];
    public static readonly RELATIONS = [];

    @Column({ nullable: true, unique: false })
    name?: string;

    @Column({ nullable: true, unique: false })
    species?: string;

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

    @RelationId((pet: Pet) => pet.user)
    userId?: string;

    @ManyToOne((type) => User, (user) => user.pets)
    user?: User;
}
