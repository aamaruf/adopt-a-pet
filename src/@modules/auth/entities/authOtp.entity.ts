import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { CrudValidationGroups } from 'nestjs-crud-utils';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('auth_otps')
export class AuthOtp {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  otp?: string;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsString({ always: true })
  @MaxLength(20, { always: true })
  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  phoneNumber?: string;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsEmail({}, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true, type: 'timestamp' })
  expiryDate?: Date;

  isExpired?: boolean;
}
