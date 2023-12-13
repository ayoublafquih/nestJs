import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EditUserDto } from '../auth/dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {
    }

    async editUser(userId: number, dto: EditUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('user not found');
        }

        try {
            const userUpdated = await this.prisma.user.update({
                where: { id: userId },
                data: dto,
            })
            delete userUpdated.hash;
            return userUpdated;
        } catch (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Email taken',
                    );
                }
            } else {
                throw error;
            }
        }

    }
}
