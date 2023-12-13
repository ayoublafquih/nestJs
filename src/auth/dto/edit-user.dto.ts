import { Optional } from '@nestjs/common';
import {
    IsEmail,
    IsOptional,
    IsString,
    ValidateIf,
} from 'class-validator';

export class EditUserDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;
}
