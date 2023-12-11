import { IsEmail, IsNotEmpty, IsString, isEmail, isNotEmpty } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}