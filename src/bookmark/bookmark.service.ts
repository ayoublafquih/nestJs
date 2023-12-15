import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookMarkDto } from './dto';
import { EditBookMarkDto } from './dto';

@Injectable()
export class BookmarkService {

    constructor(private readonly prisma: PrismaService) { }

    createBookmark(userId: number, dto: CreateBookMarkDto) {
        return this.prisma.bookmark.create({
            data: {
                ...dto,
                UserId: userId
            }
        })
    }

    getBookMarks(userId: number) {
        return this.prisma.bookmark.findMany({ where: { UserId: userId } })
    }

    getBookMarksById(userId: number, id: number) {
        return this.prisma.bookmark.findUnique({
            where: {
                id,
                UserId: userId,
            }
        })
    }

    editBookmark(userId: number, id: number, dto: EditBookMarkDto) {
        return this.prisma.bookmark.update({
            data: { ...dto },
            where: { id },
        });

    }

    deleteBookmark(userId: number, id: number) {
        return this.prisma.bookmark.delete({ where: { id, UserId: userId } });
    }

}
