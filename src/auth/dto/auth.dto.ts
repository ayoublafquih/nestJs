import { IsEmail, IsNotEmpty, IsOptional, IsString, isEmail, isNotEmpty } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;
}